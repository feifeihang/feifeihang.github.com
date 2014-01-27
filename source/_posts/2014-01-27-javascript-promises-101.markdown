---
layout: post
title: "Javascript Promises 101"
date: 2014-01-27 14:19
comments: true
categories: [Web Development, Javascript]
---

If you happened to learn or use Node.JS you should definitely heard about the word "Asynchronous". This is extremely useful as in a single-thread environment just like Javascript we always want to ensure that our programs will not be blocked by any expensive procedures at run-time. For example, like consider the below code segment:

{% codeblock lang:js %}
var sql = 'SELECT name FROM users';
var users = query(database, sql); // suppose query returns an array
console.log(users.length);
...
{% endcodeblock %}

This is a pretty traditional synchronous database querying procedure, which retrieves all the user names from database and the print the number of users in console. However, the second line could actually be a bad ass if the database contains tons of records or we happened to suffer from a slow network connection. Thereafter, our program will very likely to be blocked at the second line until it receives the result sending back from database.

In Node.JS, we use a mechanism called "callback" to address this issue and change the above program into something like this:

{% codeblock lang:js %}
var sql = 'SELECT name FROM users';
query(database, sql, function(err, res) {
    if (!err) {
        console.log(res.length);
    }
});
...
{% endcodeblock %}

This solution is brilliant. The whole program will not be blocked while waiting for the result from database. Instead, the callback function at line 2 will be invoked once the result is delivered back. Before that, the code will just keep going through the remaining procedures in the program.

However, when we are benefited by callback functions we sometimes will encounter the case of "callback hell". Now let's take a look at another code snippet below:

{% codeblock Callbacks lang:js %}
var toast = function (msg, callback) {
    'use strict';
    console.log(msg);
    process.nextTick(function () {
        callback(msg);
    });
};

toast(1, function (data) {
    'use strict';
    toast(++data, function () {
        toast(++data, function () {
            toast(++data, function () {
                toast(++data, function () {
                    // Do nothing here for now...
                });
            });
        });
    });
});

{% endcodeblock %}

It is clear that as soon as we add more callbacks into our program, the indentation levels will therefore dramatically increased and eventually turn our code into something called "pyramid code". This will also cause some other problems that were in-depth described in this [presentation](http://www.youtube.com/watch?v=hf1T_AONQJU).

To address this, Javascript Promises is proposed. In a nutshell, it provides us another pattern to create asynchronous programs in Javascript. A *Promise* essentially is an object that going to have some value at a time point in future. By correctly utilizing Promises, we can therefore create a chain of processes being executed asynchronously. The below code snippet does the same thing as the previous code does:

{% codeblock Javascript Promises lang:js %}
var Q = require('q');

var pro = function (data, error) {
    'use strict';
    var d = Q.defer();
    console.log(data);
    d.resolve(data);
    d.reject(new Error(error));
    return d.promise;
};

var toast = function (msg) {
    'use strict';
    return pro(msg);
};

toast(1).then(function (data) {
    'use strict';
    return pro(data + 1);
}).then(function (data) {
    'use strict';
    return pro(data + 1);
}).then(function (data) {
    'use strict';
    return pro(data + 1);
}).then(function (data) {
    'use strict';
    return pro(data + 1);
});

{% endcodeblock %}

In line 1, I required a Node.JS module called "Q". It is one of the implementations of Javascript Promises. Meanwhile, there are also several alternatives you can use.

From line 17 onwards, I called the method `then` in a cascading way to get the number printed in console progressively increased. It should be noticed that all the *then* are invoked asynchronously. Therefore, if one of them happens to be expensive at run-time, the whole program will still remain as non-blocked.

To use Javascript Promises is fairly straightforward, if you want to use it in Node.JS, you can install, for example, Q by:

{% codeblock lang:sh %}
npm install q
{% endcodeblock %}

If you would like to use it in front-end Javascript, then just simply import Q by putting the below code in your HTML head or body.

{% codeblock lang:html %}
<script src="//cdnjs.cloudflare.com/ajax/libs/q.js/1.0.0/q.min.js"></script>
{% endcodeblock %}

