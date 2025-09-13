# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

Issues (Mine)
-----------------
1) Failure for commas fields within quoted fields. For example, as of now, "New York, NY" would be split incorrectly.
2) Inconsistencies are not flagged. For example, when there's more or less rows/columns than required, it might fail silently and process broken data.
3) No header handling option
4) Inflexible error handling: right now it's not clear how things fail. 

- #### Step 2: Use an LLM to help expand your perspective.

Issues (ChatGPT (free model))
-----------------
1) No BOM/encoding awareness
2) Empty fields and trailing commas are lost or mis-parsed
3) Hardcoded delimiter
4) No streaming / large file support


- #### Overall enhancements


    Top 4 enhancements: 
    1) Failure for commas fields within quoted fields. For example, as of now, "New York, NY" would be split incorrectly (FUNCTIONALITY). As a user, I can enter some data but not other pieces thanks to this issue.
    2) Inconsistencies are not flagged. For example, when there's more or less rows/columns than required, it might fail silently and process broken data. (EXTENSIBILITY). As a user, I might not know why it's failing or how to fix it.
    3) No header handling option (EXTENSIBILITY). As a user, there may be confusion about how the headers work.
    4) Inflexible error handling: right now it's not clear how things fail.  (FUNCTIONALITY). As a user, something could completely fail and I'd have no idea how to fix it.

    Thoughts on ChatGPT response
    -----------------
    I think ChatGPT is right, but some of the issues it mentioned probably go beyond the scope of the assignment. For example, I don't believe we have to be worried about BOM encoding 
    or a hardcoded delimiter.

    Varying the prompt
    -----------------
    After varying the prompt, I still mostly got the same suggestions. I don't actually know enough about the assignment yet to really prompt it well enough to understand the scope
    of the project, if that makes sense. Unless I know what I'm doing as well, ChatGPT isn't much help. 


### Design Choices

### 1340 Supplement

- #### 1. Correctness

see reflection.txt

- #### 2. Random, On-Demand Generation

see reflection.txt

- #### 3. Overall experience, Bugs encountered and resolved

see reflection.txt

#### Errors/Bugs:

see reflection.txt

#### Tests:

see reflection.txt

#### How To…

see reflection.txt

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

see usage_of_ai.txt for AI use. No other students were consulted

#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-kostakarathana
