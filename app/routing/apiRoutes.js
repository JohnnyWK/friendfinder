const friends = require("../data/friends")

module.exports = function (app) {
app.get("/api/friends", function (req, res) {
    res.json(friends);
});

app.post("/api/friends", function (req, res) {
    friends.push(req.body);
    let match;
    let emptyArray = new Uint8Array(10);
    let differences = [];

    function compatibility() {

        function Comparison(user, friend, photo, difference) {
            this.user = user;
            this.friend = friend;
            this.photo = photo;
            this.difference = difference;
        };

        for (i in friends) {
            let you = parseInt(friends.length) - 1;
            let friend1 = friends[you];
            let friend2 = friends[i];
            let totalDifference = 0;

            for (j in emptyArray) {
                let dif = Math.abs(friend1.scores[j] - friend2.scores[j]);
                totalDifference += dif;
            }

            if (friend1.name !== friend2.name) {
                let comp = new Comparison(friend1.name, friend2.name, friend2.photo, totalDifference);
                differences.push(comp);
            }
        };

        differences.sort(function (a, b) {
            let keyA = a.difference,
                keyB = b.difference;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        match = differences[0];
        return match;
    };
    compatibility();
    var perfectMatch = match;
    console.log(perfectMatch)
    res.json(perfectMatch);
});

};
