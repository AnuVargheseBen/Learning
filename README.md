##### Learning Git

```bash
mkdir Demo
cd Demo
echo "#Demo" >> README.md 
```

##### This creates a file named README.md and 
##### writes #Demo in it
```bash
cat README.md
```
##### error cat is not a external or internal command
```bash
git init
```

##### To tell your computer that Demo is a directory 
#####  managed by the Git program
```bash
git add README.md
```
##### to tell the Git program you care about this file and want 
##### to track any changes from this point forward
```bash
git commit -m "first commit"
```
##### You just created a Git commit and included a message that says first commit. You must always write a message in commit; it not only helps you identify a commit,but it also enables you to understand what you did with the file at that point. So tomorrow, if you add a new piece of code in your file, you can write a commit message that says, Added new code, and when you come back in a month to look at your commit history or Git log (the list of commits), you will know what you changed in the files.
```bash
git remote add origin https://github.com/<your_username>/Demo.git
```
##### connect your computer to GitHub
```bash
git push -u origin master
```
##### To push files to my repository
```bash
git checkout -b <my branch name>
```
##### create a new branch.It will be the current branch
```bash
git checkout master
```
##### to move to master branch

##### After commit need to type git push to see the changes
```bash
git branch -d Learning
```
##### To delete branch from local git
```bash
 git remote add origin https://github.com/anuvarghese1395/ReactJS.git
 ```
 ```bash
 git add.
 ```
 ##### to add all files
 ```bash
 git remote add origin https://github.com/anuvarghese1395/ReactJS.git
 ```
 ##### to add to remote

 ```bash
 git remote get-url origin
 ```
 ##### to get the url
 ```bash
 git pull origin master
 ```
##### will pull changes from the locally stored branch origin/master and merge that to the local checked-out branch. The origin/master branch is essentially a "cached copy" of what was last pulled from origin, which is why it's called a remote branch in git parlance.
 