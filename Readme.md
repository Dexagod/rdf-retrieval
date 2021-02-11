# RDF-Retrieval

This is a javascript library for both Node and the Browser.
The library provides functionality for retrieving RDF resources in a format of choice, and for conversions between RDF formats.
A custom fetch function can be set (currently only for retrieval of remote resources).
This enables retrieval in cases where authentication is required.




### Resource retrieval functions
| Function | parameters | return | 
| -------- | ---------- | ------ |
| getResourceAsQuadStream | path (string) | Promise\<RDF.Stream<RDF.Quad>>|
| getResourceAsQuadArray  | path (string) | Promise\<RDF.Quad[]> |
| getResourceAsDataset    | path (string) | Promise\<Dataset>    |
| getResourceAsStore      | path (string) | Promise\<N3.Store <RDF.Quad, N3.Quad>>   |
| getResourceAsTextStream | path (string), format? (string) | Promise\<NodeJS.ReadableStream> |
| getResourceAsString     | path (string), format? (string) | Promise\<String>                |



### RDF Conversion functions.
The conversion functions are only available for parameters of the type RDF.Stream and RDF.Quad[]

#### Quad Stream conversions
| Function | parameters | return | 
| -------- | ---------- | ------ |
| quadStreamToQuadArray  | RDF.Stream | Promise\<RDF.Quad[]> |
| quadStreamToStore      | RDF.Stream | Promise\<N3.Store<RDF.Quad, N3.Quad>> |
| quadStreamToDataset    | RDF.Stream | Promise\<Dataset> |
| quadStreamToTextStream | RDF.Stream, format? (string) | Promise\<NodeJS.ReadableStream> |
| quadStreamToString     | RDF.Stream, format? (string) | Promise\<String> |


#### Quad Array conversions
| Function | parameters | return | 
| -------- | ---------- | ------ |
| quadArrayToQuadStream | RDF.Quad[] | Promise\<RDF.Stream<RDF.Quad>>|
| quadArrayToStore      | RDF.Quad[] | Promise\<N3.Store<RDF.Quad, N3.Quad>> |
| quadArrayToDataset    | RDF.Quad[] | Promise\<Dataset> |
| quadArrayToTextStream | RDF.Quad[], format? (string) | Promise\<NodeJS.ReadableStream> |
| quadArrayToString     | RDF.Quad[], format? (string) | Promise\<String> |

### Setting custom fetch function
A fetch function can be set using 
```
import * as f from "@dexagod/rdf-retrieval"
await f.setFetchFunction(myCustomFetch)
```
This function allows fetch functions that provide the same interface as the browser fetch function.
(and the headers.content_type header should be available for correct parsing of the resource)

## Examples
#### Setting a custom fetch function for solid
```
import * as f from "@dexagod/rdf-retrieval"
const auth = require('solid-auth-client');
const fetch = auth.fetch

// setting custom fetch function
await f.setFetchFunction(auth.fetch)

// retrieve remote solid resource
const res = await f.getResourceAsString("https://solidpod.inrupt.net/private/myprivateresource.jsonld", "text/turtle")
console.log('Retrieved resource in turtle format: ', res)
```


#### Getting the quads of a remote resource
```
import * as f from "@dexagod/rdf-retrieval"
const quads = await f.getResourceAsQuadArray("https://myWebsite.org/myResource.ttl")
```

#### Converting quads into a stream of quads
```
import * as f from "@dexagod/rdf-retrieval"
const quads = await f.getResourceAsQuadArray("https://myWebsite.org/myResource.ttl")
// conversion
const stream = await quadArrayToQuadStream(quads);
```

#### Converting quad stream into a formatted string
```
import * as f from "@dexagod/rdf-retrieval"
const stream = await f.getResourceAsQuadStream("https://myWebsite.org/myResource.ttl")
// conversion to jsonld string
const string = await quadStreamToString(stream, "application/ld+json");
```