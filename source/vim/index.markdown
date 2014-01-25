---
layout: page
title: "Vim"
date: 2012-06-27 15:22
comments: true
sharing: true
footer: true
---
I just fall in love with Vim!!! MacVim, to be more precisely. However I am not here to argue if Vim is better than Emacs or whether Emacs is more powerful than Vim. The only reason made me shifted to Vim is because of its speed and usability.

Certainly I do agree that Emacs is, somehow, more powerful and more extendible than Vim. But what functionalities do I really need from a programming editor? Built-in e-mail features? Fancy web browsing supports? Or add-on media players? My personal answer is “None of them, please”. The reason is simple, if you do want to enjoy those features, why not just turn to use an IDE or something?

So the below list shows what I expect from a programming editor:

- Syntax highlight
- Auto code completion
- Multi-language support

Hence, if you look at the functionalities provided by Vim, you can just easily tell it is the best choice. (Why not the more up-to-date editors such as “TextMate”, “Notepad++”, and etc.? Because: 1. Vim is cross-platform; 2. Vim can be run in console; 3. Vim is bundled in most of unix/unix-like systems; 4. Vim is free.)

Here is a screenshot I took from my Vim (MacVim) when I was doing a project.

{% img http://feifeihang.blog.com/files/2012/04/macvim.jpg %}

Thanks to its self-configure and plug-in supports, there are chances to customise your Vim being more stronger and powerful. Below is the current .vimrc that I am using, perhaps you may find it useful in your case.

{% codeblock My Vim configurations - .vimrc %}
set nocompatible

set smartindent
set expandtab
set tabstop=4
set shiftwidth=4
set nu
syntax on
set cursorline
set guioptions-=T
:autocmd Filetype tex syn spell toplevel
:autocmd Filetype tex set spell

set vb
set autochdir

set wildmenu
set so=7
set showcmd
set ruler

syntax enable
set background=dark
if has("gui_running")
    colorscheme molokai
else
    colorscheme molokai
endif

set transparency=3
set guioptions=aAce

set ts=4 sw=4 et
let g:indent_guides_start_level = 2
let g:indent_guides_guide_size = 1

set guicursor+=a:blinkon0

set formatoptions=l
set lbr

set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\ [HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
set laststatus=2

:noremap <buffer> <silent> k gk
:noremap <buffer> <silent> j gj
:noremap <Up> gk
:noremap <Down> gj

"folding settings
set foldmethod=indent   "fold based on indent
set foldnestmax=10      "deepest fold is 10 levels
set nofoldenable        "dont fold by default
set foldlevel=1         "this is just what i use


" REQUIRED. This makes vim invoke Latex-Suite when you open a tex file.
filetype plugin on

" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
" can be called correctly.
"set shellslash

" IMPORTANT: grep will sometimes skip displaying the file name if you
" search in a singe file. This will confuse Latex-Suite. Set your grep
" program to always generate a file-name.
"set grepprg=grep\ -nH\ $*

" OPTIONAL: This enables automatic indentation as you type.
filetype indent on

" OPTIONAL: Starting with Vim 7, the filetype of empty .tex files defaults to
" 'plaintex' instead of 'tex', which results in vim-latex not being loaded.
" The following changes the default filetype back to 'tex':
let g:tex_flavor='latex'
let g:Tex_ViewRule_pdf='Preview'

"-------------------------------"
"-----------FOR ECLIM-----------"
"-------------------------------"
" setup eclipse starter
command Eclim :!~/Bin/eclipse-indigo/eclimd &
let g:EclimNailgunClient = 'external'
"------------<eclim>-------------"

" " ZenCoding for HTML, XML, PHP, and etc. "
" let g:user_zen_settings = {
" 'php' : {
" 'extends' : 'html',
" 'filters' : 'c',
" },
" 'xml' : {
" 'extends' : 'html',
" },
" 'haml' : {
" 'extends' : 'html',
" },
" }
" 
" SuperTab Key Mapping "
" :noremap <C-Tab> <C-P>

set fuopt+=maxhorz " grow to maximum horizontal width on entering fullscreen mode
" map :set invfu " toggle fullscreen mode

" set guioptions+=LlRrb
" set guioptions-=LlRrb

" make system clipboard being the default register
set clipboard+=unnamed

hi ModeMsg term=reverse cterm=reverse gui=reverse 

let g:vimrc_author='Feifei Hang' 
let g:vimrc_homepage='http://feifeihang.github.com' 

let g:winManagerWindowLayout = "NERDTree|TagList"
" let g:winManagerWidth = 30

let Tlist_Show_One_File = 1

{% endcodeblock %}

As a popular plugin, [Eclim](http://eclim.org/) provides a large number of functionalities to projects (Java, C++, and etc.) development. Because it is based on Eclipse (version: Indigo), please make sure you have Eclipse Indigo installed before installing Eclim.

Lastly, if you use LaTeX for writing, you do need to check this out! [VIM-LaTeX](http://vim-latex.sourceforge.net/)

