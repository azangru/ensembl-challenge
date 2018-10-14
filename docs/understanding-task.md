# Understanding the task

Here is an outline of my interpretation of the tasks, in terms of precise steps that have to be translated into code. If this interpretation is incorrect, at least it will provide an explanation of what I was trying to achieve.

## Task 1: get a list of transcripts that encode a protein with a particular amino acid in a particular position

1. Query the gene by its symbol (e.g. `http://rest.ensembl.org/lookup/symbol/homo_sapiens/BRCA2.json?;expand=1`). Use the "expand" parameter to get all the gene’s transcripts in the response.

2. Use the gene id from the response to request protein sequences of this gene (e.g. for gene BRCA2, which has an id ENSG00000139618, send a request to https://rest.ensembl.org/sequence/id/ENSG00000139618?multiple_sequences=1;type=protein). This will return all protein sequences translated from this gene.

    _**Doubt:** not sure whether the response from this endpoint includes (a) all known to Ensembl variants of the protein encoded by different forms of this gene (i.e. by wild-type and various mutant forms of the gene), or (b) different proteins encoded by the same wild-type gene (e.g. due to alternative splicing). But I will proceed as if the answer is (a)._

3. Iterate through the proteins in the response searching for the one with the requested amino acid in the requested position.

    _**Note:** geneticists number amino acids in the protein starting with 1 (just to make sure, checked the conventions at http://varnomen.hgvs.org/bg-material/numbering/). Computer scientists famously start counting from 0. This will need to be taken into account when searching for amino acids in the protein sequence._

4. If such proteins are found, use their ids to select transcripts of this gene that contain the translations with such ids.

5. Display these transcripts.

## Task 2: extend task 1 by adding a field accepting an amino acid substitution code in HGVS nomenclature

_**Doubt:** the phrasing of task 2 is ambiguous: it is possible to understand it as saying that (1) a HGVS code field should be sufficient to search for the transcripts, or (2) the user should also provide the name of the gene to search for its transcripts. I will assume that the intended meaning was (1)._

1. Parse the HGVS string into its constituent parts. _Assumption: the code entered in this field will be the code of a protein_

2. By using the sequence endpoint, request the sequence of the protein and make sure that it has the respective amino acid in the requested position. Show an error message if it does not.

3. By using the lookup endpoint, get the stable id of the parent transcript of this protein and then the stable id of the parent gene of this transcript.

4. Proceed as in task 1, starting from section 2.

_**NOTE:** I initially understood this task to mean getting the ids of the transcripts containing the mutation that encodes the amino acid substitution, but could not think of a way to use the endpoints specified in the description of the task to get these mutant variants. So what the code currently does, is querying for the transcripts that encode protein sequences with the original amino acid in the requested position. For example, request for p.Val600Glu substitution will return transcripts that encode Valine, not Glutamic acid, at position 600 of the protein_

_Perhaps the correct implementation of the task was to use the /overlap/translation/:id endpoint to get the list of transcript variations, and then to look for those variations that have the specified amino acids in the "residues" field. But I believe this was not the intention of the task._
