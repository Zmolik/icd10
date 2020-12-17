--- As of 16.12.2020 ---
Germany: https://www.dimdi.de/dynamic/de/klassifikationen/icd/icd-10-gm/
- Seit dem 1. Januar 2020 ist die ICD-10-GM in der Version 2020 anzuwenden.
Switzerland: https://www.bfs.admin.ch/bfs/de/home/statistiken/gesundheit/nomenklaturen/medkk/instrumente-medizinische-kodierung.html
- Looks like ICD-10-GM is also in Switzerland.

ICD Data download here: https://www.dimdi.de/dynamic/de/klassifikationen/downloads/?dir=icd-10-gm

I used the claml file for ICD-10-GM, which is "special" format of xml.


Interesting links:
https://www.icd-code.de/  - with search, seems correct
https://www.dimdi.de/static/de/klassifikationen/icd/icd-10-gm/kode-suche/htmlgm2021/  - official


CLAML file:
-first 3076 lines is a crap not useful to us
-each unique code with diagnosis name and their alternative names are in element Class
    -inside Class are among others following attributes: 
        - code="somecodehere" (the first one has the code we need)
        - kind="preferred" by .text() you access it's the preferred name of diagnose
        - kind="inclusion" by .text() you access it's alternative names/synonyms
    - their is one preferred name for each unique code, but zero or more of alternative names(kind="inclusion")
-11889 codes/diagnoses

How I did it:
Please be aware I still am beginner while using JS and TS, so maybe I used some weird solutions which makes no sense to you.
So please correct me and give me tips how to do it better/more elegant/easier! 

Cheerio: 
- codes: the idea was to access $("Class") and then iterate over it and for each access .attr("code"). I don't know why but 
  I could not iterate over the Class... if you any idea how to do it please tell me!
    - so I went around it and did it "oldschool" using string methods -> see getCodes.TS
        - here is also a small mystery: I had to delete the first 3076 lines in the input for it to get all the same number of codes as I got preferredNames of diagnoses (don't know why!)
- diagnoses: the idea was the same, access $("Class"), iterate over it and for each find preferredName and all the alternative ones. As I couln't iterate over
  the Classes I couln't get the alternative names in a list and pinpoint it to the unique code. But I could get all the preferred names and then merge them 
  with all the codes. One code gets one preferred name, so this could have been done. -> see getPreferred.ts and the merge is in main.ts

In the end I matched the preferred names with the names of diagnoses from sublimd. Like this I got 345 matched. There are some mistakes z.B. Struma, but otherwise
it seems suprisingly good. 

I feel stuck because I could not get the iteration over "Class" to work. Because of that I can't match the alternatvie names. Can you please take look at it?
Maybe you know how to do it...

My plan is:
1. To iterate over the each Class/Code and try to match sublimd diagnose names with the alternative names.
2. For the rest without the match try to use search at https://www.icd-code.de/ or at duckduckgo.

"npm start" (transpile to js and starts main.js)

main.ts - the first half of the code that is inside the comment: that's code I used for scraping data from claml file. The code can't run at once.
          I was coding and running step by step, so the used code I put into comment and write another one underneath it. 
            Step 1: run code.main() and preferred.getData(). Put it into comments.
            Step 2: run the rest
        - the second half that is not inside comment is the part that matches sublimd and icd10


