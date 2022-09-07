https://www.facebook.com/codingcompetitions/hacker-cup/2021/round-1/problems/A1

Note: This problem shares similarities with Chapters 2 and 3. The solution to any chapter may help with solving the others, so please consider reading all of them first.
Timmy the toddler is training to be a top typist. His teacher has assigned some homework in the form of a list of TT string exercises to be typed, consisting of only the uppercase letters "F", "O", and "X".
Timmy is eating a popsicle on a hot summer afternoon, but still hopes to complete his homework. He would like to hold the popsicle with one hand, and type with the other. Unfortunately, Timmy is still a growing boy, and each of his hands is a tad too small to reach all the way across the keyboard. He can only reach the letters "F" and "X" with his left hand, and the letters "F" and "O" with his right.
Consider a string WW which Timmy must type. Timmy may start typing with any hand of his choice (with the other holding the popsicle). He must then switch hands as necessary to type out the |W|∣W∣ letters in order, ending on any hand of his choice.
Given an exercise string WW of length NN, let F(W)F(W) be the minimum number of times Timmy must switch hands to type WW. Please help Timmy compute the value of F(W)F(W).
Constraints
1≤T≤80
1≤N≤800,000
Each string consists only of the letters "F", "O", and "X".
The sum of NN across all exercises is at most 4{,}000{,}0004,000,000.
Input
Input begins with an integer TT, the number of exercises that Timmy has been assigned. For each exercise, there is first a line containing the single integer NN, followed by a second line containing the string WW of length NN.
Output
For the iith exercise, output a line containing "Case #i: " followed by a single integer, F(W)F(W).
Sample Explanation
In the first exercise, if Timmy begins with his right hand, he can type the single letter "O" without needing to switch to his left hand.
In the second exercise, if Timmy begins with his left hand, he can type all 33 of the string's letters in order with 11 hand switch (for example, by switching to his right hand after typing the 11st letter).
In the third exercise, Timmy can type the entire string with his right hand.
In the fourth exercise, it's possible for Timmy to type the string while only switching hands twice.