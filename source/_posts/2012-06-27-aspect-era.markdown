---
layout: post
title: "Aspect Era"
date: 2012-02-13 14:53
comments: true
categories: 
---
As aspect-oriented programming and its techniques are becoming more and more important nowadays, it is really difficult and unreasonable to overlook the aspect-related things. By asking myself the differences between “Action” and “Aspect”, I finally got the following relationship between the two concepts based on my knowledge: (Concern >=) Aspect >= Action. More precisely, an “action” basically is a “Verb-DO” pair; an “aspect” can be explained as a group of “actions”, which are gathering together for a certain concern/goal.

<!--more-->
In [1], Zsolt Balanyi and Rudolf Ferenc classified design patterns into three types: Creational, Structural, and Behavioural. Given that an “aspect” is being used as a stand-alone module that expresses cross-cutting concerns, AOP(aspect-oriented programming) is more likely to be a behaviour-related approach. In other words, to my understand, Aspect Mining may be quite beneficial to behavioural-design-pattern detections or refactoring. (Am I making myself clear?)

As described by Ceccato and et al. in [2], there are at least three aspect mining techniques available nowadays. Since “Identifier Analysis” is implemented by using Text Mining, my research will now be focused on identifier analysis for aspect mining in the current stage.

Cheers!!!

Feifei

——

[1] Balanyi, Z. and Ferenc, R, 2003, Mining Design Patterns from C++ Source Code

[2] M. Ceccato and et al., 2005, A Qualitative Comparison of Three Aspect Mining Techniques

