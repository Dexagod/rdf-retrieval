/// <reference types="node" />
/// <reference types="node" />
import * as RDF from 'rdf-js';
import * as N3 from "n3";
export declare const getResourceAsQuadStream: (path: string) => Promise<RDF.Stream<RDF.Quad> & import("stream").Readable>;
export declare const getResourceAsQuadArray: (path: string) => Promise<RDF.Quad[]>;
export declare const getResourceAsDataset: (path: string) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const getResourceAsStore: (path: string) => Promise<N3.Store<RDF.Quad, N3.Quad, RDF.Quad, RDF.Quad>>;
export declare const getResourceAsTextStream: (path: string, format?: string) => Promise<NodeJS.ReadableStream>;
export declare const getResourceAsString: (path: string, format?: string) => Promise<String>;
export declare const quadStreamToQuadArray: (input: RDF.Stream) => Promise<RDF.Quad[]>;
export declare const quadArrayToQuadStream: (input: RDF.Quad[]) => Promise<any>;
export declare const quadStreamToStore: (input: RDF.Stream) => Promise<N3.Store<RDF.Quad, N3.Quad, RDF.Quad, RDF.Quad>>;
export declare const quadArrayToStore: (input: RDF.Quad[]) => Promise<N3.Store<RDF.Quad, N3.Quad, RDF.Quad, RDF.Quad>>;
export declare const quadStreamToDataset: (input: RDF.Stream) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const quadArrayToDataset: (input: RDF.Quad[]) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const quadStreamToTextStream: (input: RDF.Stream, format?: string) => Promise<NodeJS.ReadableStream>;
export declare const quadArrayToTextStream: (input: RDF.Quad[], format?: string) => Promise<NodeJS.ReadableStream>;
export declare const quadStreamToString: (input: RDF.Stream, format?: string) => Promise<String>;
export declare const quadArrayToString: (input: RDF.Quad[], format?: string) => Promise<String>;
/**
 * Converts a WhatWG streams to Node streams if required.
 * Returns the input in case the stream already is a Node stream.
 * @param {ReadableStream} body
 * @returns {NodeJS.ReadableStream}
 */
export declare function toReadableStream(body: ReadableStream | null): NodeJS.ReadableStream;
//# sourceMappingURL=index.d.ts.map