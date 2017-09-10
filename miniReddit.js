var fetchDataRequest = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "https://www.graphqlhub.com/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        document.getElementsByClassName("fetching-text")[0].style.display = 'none';
        prepareHotListingsList(xhr.response.data.reddit.subreddit.hotListings);
    };
    var reqString = '{ reddit { subreddit(name: "pics"){ hotListings(limit: 10) { url score title numComments author { username } } } } }';
    xhr.send(JSON.stringify({query: reqString}));
};

var prepareHotListingsList = function (fetchingData) {
    var PICS_LIST_OFFSET = 2;
    document.getElementsByClassName('list-wrapper')[0].style.display = 'block';
    var hotListingsList = document.getElementsByClassName('hot-listings-list')[0];

    //create list and append html
    for (var i = PICS_LIST_OFFSET; i < fetchingData.length; i++) {
        var id = i - 1;
        var newLI = document.createElement('li');
        var score = '<div class="score">' + fetchingData[i].score + '</div>';
        var author = '<div class="author"><a class="author_link" target="_blank" href="https://www.reddit.com/user/' + fetchingData[i].author.username + '">' + fetchingData[i].author.username + '</a></div>';
        var title = '<div class="title"><a class="title_link" href="' + fetchingData[i].url + '" target="_blank">' + fetchingData[i].title + '</a></div>';
        var numOfComments = '<div class="num-comments">' + fetchingData[i].numComments + ' Comments</div>';
        var rank = '<div class="rank">' + id + '</div>';
        var html = rank + score + title + author + numOfComments;
        appendHtml(newLI, html);
        hotListingsList.appendChild(newLI);
    }

};

var appendHtml = function (element, htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    while (div.children.length > 0) {
        element.appendChild(div.children[0]);
    }
};


fetchDataRequest();