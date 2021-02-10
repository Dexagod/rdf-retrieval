import { isBrowser } from 'browser-or-node';
import * as RDF from 'rdf-js';
import * as N3 from "n3";
import factory from "rdf-ext";
import rdfDereferencer from "rdf-dereference";
import rdfSerializer from "rdf-serialize";
import rdfParser from "rdf-parse";

const stringifyStream = require('stream-to-string');
const streamifyArray = require('streamify-array');

// Data retrieval functions
export const getResourceAsQuadStream = async (path: string) => {
  return await fetch(path, isRemote(path))
}

export const getResourceAsQuadArray = async (path: string) => {
  const stream = await fetch(path, isRemote(path))
  return await quadStreamtoQuadArray(stream)
}

export const getResourceAsDataset = async (path: string) => {
  const quadStream = await getResourceAsQuadStream(path)
  return await quadStreamtoDataset(quadStream)
}

export const getResourceAsStore = async (path: string) => {
  const quadArray = await getResourceAsQuadArray(path)
  return new N3.Store(quadArray);
}

export const getResourceAsTextStream = async (path: string, format?: string) => {
  const quadStream = await getResourceAsQuadStream(path)
  return await quadStreamtoTextStream(quadStream, format);
}

export const getResourceAsString = async (path: string, format?: string) => {
  const quadStream = await getResourceAsQuadStream(path)
  return await quadStreamtoString(quadStream, format); 
}

// Data conversion functions

export const quadStreamtoQuadArray = async (input: RDF.Stream) : Promise<RDF.Quad[]> => {
  return new Promise((resolve, reject) => { 
    const quads : RDF.Quad[] = []
    input
    .on('data', (quad) => {quads.push(quad)})
    .on('error', (error) => reject(new Error(`Error parsing notification body.\n${error.message}`)))
    .on('end', () => resolve(quads));
  })
}

export const quadArraytoQuadStream = async (input: RDF.Quad[]) => {
  return await streamifyArray(input);
}

export const quadStreamtoStore = async (input: RDF.Stream) => {
  return new N3.Store(await quadStreamtoQuadArray(input))
}

export const quadArraytoStore = async (input: RDF.Quad[]) => {
  return new N3.Store(input)
}


export const quadStreamtoDataset = async (input: RDF.Stream) => {
  return await factory.dataset().import(input)
}

export const quadArraytoDataset = async (input: RDF.Quad[]) => {
  const quadStream = await quadArraytoQuadStream(input);
  return await factory.dataset().import(quadStream)
}


export const quadStreamtoTextStream = async (input: RDF.Stream, format?: string) => {
  format = format || "text/turtle"
  return rdfSerializer.serialize(input, {contentType: format})
}

export const quadArraytoTextStream = async (input: RDF.Quad[], format?: string) => {
  format = format || "text/turtle"
  const quadStream = await quadArraytoQuadStream(input);
  return rdfSerializer.serialize(quadStream, {contentType: format})
}


export const quadStreamtoString = async (input: RDF.Stream, format?: string) => {
  const textStream = await quadStreamtoTextStream(input, format)
  return await stringifyStream(textStream) as String
}

export const quadArraytoString = async (input: RDF.Quad[], format?: string) => {
  const textStream = await quadArraytoTextStream(input, format)
  return await stringifyStream(textStream) as String
}



const isRemote = (path: string) => {
  let remoteURL = true;
  try{ new URL(path) }
  catch (e) {remoteURL = false}
  return remoteURL
}


var _fetcher = async(path: string, local: boolean) => {
  if (isBrowser && local) throw new Error("Cannot retrieve local files from browser environment.")
  const { quads } = await rdfDereferencer.dereference(path, {localFiles: local})
  return quads
}

var _customfetcher: any;

const fetch = async(path: string, local: boolean) => {
  if (_customfetcher) { 
    // Only for custom fetch functions in the browser
    const response = await _customfetcher(path);
    const content_type = response.headers.get('content-type')
    try {
      const inputStream = toReadableStream(response.body)
      return rdfParser.parse(inputStream, { contentType: content_type })
    } catch(e) {
      throw new Error(`Error parsing resource at ${response.url}.`)
    }
  }
  else return _fetcher(path, local);
}


export const setFetchFunction = async(f: Function) => {
  _customfetcher = f
}



/**
 * Converts a WhatWG streams to Node streams if required.
 * Returns the input in case the stream already is a Node stream.
 * @param {ReadableStream} body
 * @returns {NodeJS.ReadableStream}
 */
export function toReadableStream(body: ReadableStream | null): NodeJS.ReadableStream {
  return require('is-stream')(body) ? body : require('web-streams-node').toNodeReadable(body);
}