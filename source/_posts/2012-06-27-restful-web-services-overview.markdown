---
layout: post
title: "RESTful Web Services Overview"
date: 2012-05-07 15:06
comments: true
categories: 
---
##What is REST?##

The term Representational State Transfer (__REST__) was introduced and defined in 2000 by Dr. Roy Fielding in his [doctoral dissertation](http://jpkc.fudan.edu.cn/picture/article/216/35/4b/22598d594e3d93239700ce79bce1/7ed3ec2a-03c2-49cb-8bf8-5a90ea42f523.pdf). REST and [SOAP](http://en.wikipedia.org/wiki/SOAP) are not necessarily opposites as REST is an architectural style, whereas SOAP is a general protocol that can be used as an element of many different architectures. However, in contract with RPC-style web services (i.e. Big web services), REST web services is being described as a resource-oriented architecture, which means that REST intents to abstract the business entities involved in business processes as _resources_, and treats the resources as the core abstraction. Meanwhile, each resource is uniquely identified using a _Uniform Resource Identifier_ (__URI__) and managed by an origin server. Clients communicate with the servers using uniform interfaces (e.g. __GET__, __POST__, __PUT__, __DELETE__).

<!--more-->
REST is in many ways a retrospective abstracting of the principles that make the World Wide Web scaleable. Unlike transactional systems, in which servers need to maintain complex sessions with clients, the web reduces the server’s obligation that arises from a self-contained question to a simple response. In many cases, the response involves sending a precomputed set of data, the representational state, across the network.

In REST, each request sent to an object results in the transfer of a representation of this object. The representation (typically in the form of an XML document) provides the client with the opportunity to change the state of the object by navigating to a different URI, which is referenced in the document. In REST, this inter-reference feature/principle is called “_Hypermedia as the Engine of Application State_” (__HATEOAS__).

While the core benefits of SOAP lie in the tight coupling of operations, which can be tested and debugged before an application is deployed, the advantages of the REST-based approach lie in the potential scalability of a REST-based system and the lightweight access to its operations due to the limited number of operations and the unified address schema.

For a detailed comparison on the characteristics of REST and SOAP, please refer to Table 1 in [Developing Web Services Choreography Standards – The Case of REST Vs. SOAP](http://www.sciencedirect.com/science/article/pii/S0167923604000612).

##Who is using REST?##

The below is an incomplete list showing the well-known companies and organisations who are exposing services under REST-based approach.

* Google
* Amazon
* Twitter
* Flickr
* MySpace
* Facebook
* etc.

##What framework do I need to build a RESTful service?##

Essentially, there is no certain requirements or limitations on the frameworks or tools used to build RESTful services. However, there are plenty of such frameworks that makes our works being easier and more efficient when working with REST out there. Ruby on Rails might be one of the most famous among all.

Given that I rarely know about Ruby, I choose to use [Restlet](http://www.restlet.org/) when building RESTful services in Java. Actually an official API called JAX-RS is released as a part of Java EE for RESTful web services. However, I have never used it ever before, because:

1. Restlet works, and it works well.
2. I just did not have enough time to try it out. 

Cheers!!!

Feifei


