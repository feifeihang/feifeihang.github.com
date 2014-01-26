---
layout: post
title: "“Service Spotlight” -- An Alternative to UDDI"
date: 2014-01-25 21:33
comments: true
categories: [Web Service, Service Discovery, Service Composition, Web Development]
---

{% blockquote Wikipedia, Universal Description Discovery and Integration %}
Universal Description, Discovery and Integration is a platform-independent, Extensible Markup Language (XML)-based registry by which businesses worldwide can list themselves on the Internet, and a mechanism to register and locate web service applications.
{% endblockquote %}

## The Fallen of Public UDDI

As described by its definition, **UDDI** (**U**niversal **D**escription **D**iscovery and **I**ntegration) aims at provide a more or less centralised repository for service registration and discovery, so that service composition could be then further supported by reducing the difficulty of searching decent services to compose. The whole idea looks fine, until the major players in the UDDI movement eventually fall apart.

The problem of a public UDDI is in its so-called “universal” feature. Just like what happened to the Web, different parties produce information on different websites. It is almost impossible to ask people putting their stuffs under the same domain or website. Why? **It is expensive!** To make multiple parties coordinating and even integrating with others, the information and data provided have to be formularised. It may be okay for big companies who always steering the games. But what about small organisations and even individual providers? It could be meaningless to heavily envolope a “Hello World”. So far so forth, the universal repository of Web services also failed.

## Service Spotlight to the Rescue

To assist service composition, we still need something to help us discovering services. For me, *search engine* could be the solution. However, if you type “map location” in Google, you will get tons of results which are actually not the Web services that we can compose. Therefore, I recently developed [Service Spotlight](http://feifeihang.info/spotlight) as a dedicated Web service search engine. Its back-end crawlers grab service descriptions from several service providers, such as Twitter and Flickr, and popular service repositories like Programmable Web.

In the next development stage, all the service descriptions found by Service Spotlight will by automatically convert to the form of either natural language or structure format such as WSDL and WADL.

I believe that this will be a more effective and realistic solution to address service discovery comparing to UDDI.

