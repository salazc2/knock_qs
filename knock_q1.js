//Write a function that takes two strings: a and b of varying lengths and 
//merges them into a single string, appending any remaining characters to 
//the end and returns it. For example you have two strings abc and stuvwx. 
//Alternating between the two you should return asbtcuvwx.


// Assumptions:
//parameter has two strings
//returns a string
//
// There will always be at least 1 character in each parameter but
//I need to check that the type is a string. 

// Edge cases: check when there is 1 character for each parameter or one character
//for the stringA or stringB. Check when the lengths are equal. Check if strings are 
//empty.

// Data Structure: Since I need to go through each char from the shortest string length,
//I can just concatonate chars to a variable instead of creating a new array by splitting
//the strings which saves space.

//Time complexity is O(M + N) where I have the two for loops based shortest length string and longest
//length string.

//Space complexity is O(1) since I am just appending to the let variable answer.

function merge(stringA, stringB) {

    if(stringA.length == 0) {
        return stringB
    } else if(stringB.length == 0 ) {
        return stringA
    } else if (stringA.length == 0 && stringB.length == 0) {
        return "Both strings are empty"
    }
    //Check paramaters to make sure they are of type string
    if(typeof stringA != 'string' || typeof stringB != 'string') {
        // throw 'Paramaters are not strings'
        return 'Paramaters are not strings'
    }

    let answer = '' //the return string value
    let shortest = stringA.length //assume first stringA is the smallest length string
    let longest = stringB //assume stringB is the longest length string

    //make stringB the shortest and string A the longest if A is longer
    if(stringA.length > stringB.length) {
        shortest = stringB.length
        longest = stringA
    } 

    //concatonate the chars from each index of the string into answer
    let i = 0
    for(; i < shortest; i++) {
        answer = answer + stringA.charAt(i) + stringB.charAt(i)
    }

    //add the remaining values if any from the longest string
    for(let j = i; j < longest.length; j++) {
        answer = answer + longest.charAt(j)
    } 
    return answer
}

console.log(merge('aBc', 'stuVwx')) //return asbtcuvwx
console.log(merge('a', 'bcdef')) //return abcdef
console.log(merge('abcd', 'abcd')) //return aabbccdd
console.log(merge('bcdef', 'A'))  //return bacdef
console.log(merge(1, 'abcde')) //return 
console.log(merge("", "aBcde"))
console.log(merge("abcde", ""))
console.log("Empty |" + merge("","") + "|.")