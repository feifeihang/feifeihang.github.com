---
layout: post
title: "Hints From \"Mining Design Patterns from C++ Source Code\""
date: 2012-02-09 14:47
comments: true
categories: 
---
Having reviewed the paper “Mining Design Patterns from C++ Source Code”, written by Zsolt Balanyi and Rudolf Ferenc, there are some hints which came to my mind.

Essentially, what Balanyi and Ferenc described in their paper is a domain specific language called “Design Pattern Markup Language (DPML)”, which is designed to provide a way for users to modify pattern descriptions[1], and a method based on Columbus[2] and DPML to search design patterns in existing C++ source code. More precisely, their research is motivated by the idea of “identifying/finding out what design patterns have been used in a C++ source code”.

<!--more-->
Apparently, their research is sort of like the potential research direction I mentioned in my [previous post](http://feifeihang.github.com/blog/2012/02/09/text-mining-the-state-of-the-art-and-future-research-direction/ "link"). Although both of us are focusing on the keywords “design patterns” and “mining” (suppose that this will be my exact research direction), there is a significant difference here as Balanyi and Ferenc are attempting to “extract” design patterns in source code while I am thinking about to “refactor/transform” source code into design patterns.

So, the hints/lessons that I got/learnt from their works are:

When trying to describe a design pattern, a specifically designed schema or language may be helpful.
Alternatively, in order to make the research to be more focused on specific things, only a small group of design patterns will be concentrated on.
Finally, thanks to Balanyi and Ferenc. There are such a lot I can learn from their contributions.

Cheers!!!

Feifei

——

[1] Z. Balanyi and R. Ferenc, 2003, Mining Design Patterns from C++ Source Code

[2] R. Ferenc and et al., 2002, Columbus – Reverse Engineering Tool and Schema for C++

