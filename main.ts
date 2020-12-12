import { listeners } from "cluster";
import { read } from "fs";
import { TFile, Plugin, Notice, PluginSettingTab, Setting } from "obsidian";
export default class MyPlugin extends Plugin {
  private flashcards: string[] = [];
  private counter = 0;
  private MAXCHARS = 40;
  private DURATION = 4000;
  private startPosition = 0;
  private globalIntervalId = 0;
  statusBar: HTMLElement;

  myFunc = () => {
    if (this.counter == this.flashcards.length - 1) {
      this.counter = this.startPosition;
    } else {
      this.counter++;
    }
    let statusBarText = this.flashcards[this.counter];
    if (statusBarText.length > this.MAXCHARS) {
      this.counter++;
    } else {
      let marginText = "‎‎‎‏‏‎‏‏‎ ‎".repeat(
        Math.floor((this.MAXCHARS - statusBarText.length) / 2)
      );
      this.statusBar.setText(marginText + statusBarText + marginText);
    }
  };

  readLines(lines: string) {
	let isTableWithHeader = false;
	let isTableWithoutHeader = false;
    let isCustomized = true;
	this.flashcards = lines.split(/\n/);
    //removes blank strings
    this.flashcards = this.flashcards.filter(function (v) {
      return v !== "";
    });

    if (+this.flashcards[0] == 0) {
      isCustomized = false;
    } else{
		this.DURATION = Math.max(+this.flashcards.shift(), 300)
		this.updateInterval(this.myFunc, this.DURATION);
	}

    if (this.flashcards[0].contains("|") && this.flashcards[1].contains("-")) {
	  isTableWithHeader = true;
	  this.flashcards.shift()
	  this.flashcards.shift()
	  
	} else if (this.flashcards[0].contains("|")) {
		isTableWithoutHeader = true;
		this.flashcards.shift()
	}
	if(isTableWithHeader || isTableWithoutHeader)
	{
		this.flashcards.forEach((o, i, a) => a[i] = a[i].split("|").join(": "))
	}

    console.log(this.flashcards);
  }

  onload() {
    console.log("loading plugin");

    this.registerEvent(
      this.app.workspace.on("file-open", (file: TFile) => {
        const flashcard_file = "flashcard.md";

        this.app.vault.adapter
          .read(flashcard_file)
          .then((cards) => this.readLines(cards))
          .catch((error) => {
            new Notice(
              "Error loading flashcard.md -- please create a flashcard.md file"
            );
          });
      })
    );

    this.statusBar = this.addStatusBarItem();
    this.statusBar.setText("");
    this.updateInterval(this.myFunc, this.DURATION);
  }

  updateInterval = (myFunc: Function, duration: number) => {
    if (this.globalIntervalId != 0) {
      console.log(`ending interval with id ${this.globalIntervalId}`);
      window.clearInterval(this.globalIntervalId);
    }
    this.globalIntervalId = window.setInterval(myFunc, duration);
    console.log(`interval assigned as ${this.globalIntervalId}`);
    this.registerInterval(this.globalIntervalId);
  };

  onunload() {
    console.log("unloading plugin");
  }
}

/*
class SampleSettingTab extends PluginSettingTab {
	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Duration setting')
			.setDesc('the duration between switches')
			.addText(text => text.setPlaceholder('TODO')
				.setValue('')
				.onChange((value) => {
					console.log(value)
				}));

	}
}*/
