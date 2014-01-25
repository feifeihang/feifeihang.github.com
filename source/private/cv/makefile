# set latexfile to the name of the main file without the .tex
latexfile = cv

TEX = pdflatex

pdf : $(latexfile).tex
	$(TEX) $(latexfile).tex

.PHONY : clean
clean :
	-rm ./*.pdf ./*.log
