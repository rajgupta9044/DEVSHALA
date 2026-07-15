Quick Summary Table
------------------------------------------------------------

Operator      Meaning

$eq           Equal
$ne           Not Equal
$gt           Greater Than
$gte          Greater Than or Equal
$lt           Less Than
$lte          Less Than or Equal
$in           Match any value in an array
$nin          Exclude values in an array

Example Combining Multiple Operators
------------------------------------------------------------

Problem.find({
    difficulty: "easy",
    votes: {
        $gte: 100
    },
    tags: {
        $in: ["Array", "Graph"]
    }
});

This query returns only those problems that:

• Have difficulty = easy
• Have at least 100 votes
• Contain either "Array" or "Graph" in their tags

------------------------------------------------------------
Example Using Multiple Comparison Operators
------------------------------------------------------------



Problem.find({
    votes: {
        $gte: 50,
        $lte: 200
    }
});

Equivalent Meaning

50 ≤ votes ≤ 200


Example: Easy Problems Except DP
------------------------------------------------------------

Problem.find({
    difficulty: "easy",
    tags: {
        $nin: ["DP"]
    }
});

Returns all easy problems that are NOT tagged with "DP".
