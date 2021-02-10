/// <reference types="node" />
import * as RDF from 'rdf-js';
import * as N3 from "n3";
export declare const getResourceAsQuadStream: (path: string) => Promise<RDF.Stream>;
export declare const getResourceAsQuadArray: (path: string) => Promise<RDF.Quad[]>;
export declare const getResourceAsDataset: (path: string) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const getResourceAsStore: (path: string) => Promise<N3.Store<RDF.Quad, N3.Quad>>;
export declare const getResourceAsTextStream: (path: string, format?: string | undefined) => Promise<NodeJS.ReadableStream>;
export declare const getResourceAsString: (path: string, format?: string | undefined) => Promise<String>;
export declare const quadStreamtoQuadArray: (input: RDF.Stream) => Promise<RDF.Quad[]>;
export declare const quadArraytoQuadStream: (input: RDF.Quad[]) => Promise<any>;
export declare const quadStreamtoStore: (input: RDF.Stream) => Promise<N3.Store<RDF.Quad, N3.Quad>>;
export declare const quadArraytoStore: (input: RDF.Quad[]) => Promise<N3.Store<RDF.Quad, N3.Quad>>;
export declare const quadStreamtoDataset: (input: RDF.Stream) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const quadArraytoDataset: (input: RDF.Quad[]) => Promise<import("rdf-ext/lib/Dataset")>;
export declare const quadStreamtoTextStream: (input: RDF.Stream, format?: string | undefined) => Promise<NodeJS.ReadableStream>;
export declare const quadArraytoTextStream: (input: RDF.Quad[], format?: string | undefined) => Promise<NodeJS.ReadableStream>;
export declare const quadStreamtoString: (input: RDF.Stream, format?: string | undefined) => Promise<String>;
export declare const quadArraytoString: (input: RDF.Quad[], format?: string | undefined) => Promise<String>;
//# sourceMappingURL=index.d.ts.map