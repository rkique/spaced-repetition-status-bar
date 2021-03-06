## Spaced Repetition in Status Bar

This is a simple plugin which cycles through text in the status bar. This allows you to always have the text open, great for memorizing short flashcards or learning vocabulary.

To use, simply create a note titled `flashcard` in the root folder of your vault (or import a `flashcard.md` file), and fill it with the text you want to cycle through line by line. The plugin also supports tables written in the regular Obsidian syntax.


![Flashcard demo](https://raw.githubusercontent.com/rkique/spaced-repetition-status-bar/master/flashcard-demo.PNG?token=ALD3BG6U3GHE6MJLJK674PS73Y2E4)
<img src="https://raw.githubusercontent.com/rkique/spaced-repetition-status-bar/master/demo.gif?token=ALD3BG6URUSFBJX4D525ZBS73YZYG" width="800">

The first line can optionally set the number of milliseconds to display each line (it defaults to 4000, or 4 seconds). 

For best results, use less than 60 characters per line. You can reduce the amount of shifting occurring in the status bar by disabling other status text plugins, enabling this plugin first, and then reenabling the others. This will put this plugin at the front of the list.

