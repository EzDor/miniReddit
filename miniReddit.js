var fetchDataRequest = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "https://www.graphqlhub.com/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        document.getElementsByClassName("fetching-text")[0].style.display = 'none';
        prepareListingsList(xhr.response.data.reddit.subreddit.controversialListings);
    };
    var reqString = '{ reddit { subreddit(name: "pics"){ controversialListings(limit: 10) { url score title numComments author { username } } } } }';
    xhr.send(JSON.stringify({query: reqString}));
};

var prepareListingsList = function (fetchingData) {
    document.getElementsByClassName('list-wrapper')[0].style.display = 'block';
    var listingsList = document.getElementsByClassName('listings-list')[0];
    for (var i = 0; i < fetchingData.length; i++) {
        var listItemDetails = [
            {
                'type': 'div',
                'class': 'rank',
                'value': i + 1
            },
            {
                'type': 'div',
                'class': 'score',
                'value': fetchingData[i].score
            },
            {
                'type': 'a',
                'class': 'title',
                'value': fetchingData[i].title,
                'onClick': 'showImage("' + fetchingData[i].url + '")'
            },
            {
                'type': 'a',
                'class': 'author',
                'value': fetchingData[i].author.username,
                'target': '_blank',
                'href': 'https://www.reddit.com/user/' + fetchingData[i].author.username
            },
            {
                'type': 'div',
                'class': 'num-comments',
                'value': fetchingData[i].numComments + ' Comments'
            }

        ];
        var newLI = createListElement(listItemDetails);
        listingsList.appendChild(newLI);
    }

};

var createListElement = function (innerElementsDetails) {
    var listElement = document.createElement('li');
    for (var i = 0; i < innerElementsDetails.length; i++) {
        var elm = createCustomElement(innerElementsDetails[i]);
        listElement.appendChild(elm);
    }
    return listElement;
};

var createCustomElement = function (options) {
    var element = document.createElement(options['type']);
    var keys = Object.keys(options);
    keys.forEach(function (option) {
        if (option === 'value') {
            element.textContent = options[option];
        }
        else if (option !== 'type') {
            element.setAttribute(option, options[option]);
        }
    });
    return element
};

var showImage = function (url) {
    var isImage = url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    if(isImage){
        document.getElementsByClassName('list-wrapper')[0].style.display = 'none';
        document.getElementsByClassName("image-to-show")[0].src = url;
        document.getElementsByClassName("image-container")[0].style.display = 'block';
        document.body.style.backgroundColor = "#42f492";
    }
    else {
        window.open(url, '_blank');
    }
};

var backButtonClicked = function () {
    document.getElementsByClassName('list-wrapper')[0].style.display = 'block';
    document.getElementsByClassName("image-container")[0].style.display = 'none';
    document.body.style.backgroundColor = "#FFFFFF";
};

fetchDataRequest();