# Understanding the task

Here is an outline of my interpretation of the tasks, in terms of precise steps that have to be translated into code. If this interpretation is incorrect, at least it will provide an explanation of what I was trying to achieve.

## Task 1: Get a list of transcripts that encode a protein with a particular amino acid in a particular position

1. Query the gene by its symbol (e.g. `https://rest.ensembl.org/lookup/symbol/homo_sapiens/BRCA2?expand=1`). Use the "expand" parameter to get all the gene’s transcripts in the response.

2. Use the gene id from the response to request protein sequences of this gene (e.g. for gene BRCA2, which has an id ENSG00000139618, send a request to https://rest.ensembl.org/sequence/id/ENSG00000139618?multiple_sequences=1;type=protein). This will return all protein sequences translated from this gene.

3. Iterate through the proteins in the response searching for those that have the queried amino acid in the specified position.

    _**Note:** geneticists number amino acids in the protein starting with 1 (just to make sure, checked the conventions at http://varnomen.hgvs.org/bg-material/numbering/). Computer scientists famously start counting from 0. This will need to be taken into account when searching for amino acids in the protein sequences._

4. If such proteins are found, use their ids to select transcripts of this gene (obtained in step 1) that contain the translations with such ids.

5. Display these transcripts.

## Task 2: Extend task 1 by adding a field accepting an amino acid substitution code in HGVS nomenclature

_**Doubt:** I have several uncertainties regarding the phrasing of task 2. The most important ones are: 1) given a string such as ENSP00000419060.2:p.Val600Glu​, should I only show the transcript corresponding to the ENSP00000419060.2 protein (if this protein has Valine in position 600), or all transcripts of the gene that encodes ENSP00000419060.2? 2) should I only list the transcripts where the original amino acid (Valine) is substituted for the specified amino acid (Glutamic acid in this example), or all transcripts of the gene that encode for Valine in position 600?_

_Based on the phrase "have the interface return the same results as above", I will assume that the task requires returning all transcripts of the gene that encode the original amino acid in the specified position._

1. Parse the HGVS string into its constituent parts. _Assumption: the code entered in this field will be code of a protein_

2. By using the sequence endpoint, request the sequence of the protein by its stable id and make sure that it has the specified original amino acid in the specified position. Show a message if it does not.

3. By using the lookup endpoint, get the stable id of the parent transcript of this protein, and then the stable id of the parent gene of this transcript.

4. Proceed as in task 1 section 2.
