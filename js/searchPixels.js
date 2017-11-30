'use strict';

const searchImageForKnownInvaders = (radarImage, knownInvader) => {
  this.radarImage = radarImage;
  this.knownInvader = knownInvader;

  const handleImageSearch = {
    radarImageHashTable: [],
    radarImageSplitByNewLine () {
      return radarImage.split(/\n/);
    },
    knownInvaderSplitByNewLine () {
      return knownInvader.split(/\n/)
    },
    radarImageIntoArrays () {
      return this.radarImageSplitByNewLine().map(imagePixel => imagePixel.split(''))
    },
    concatRadarImageArray () {
      return this.radarImageIntoArrays().reduce((firstArray, secondArray) => firstArray.concat(secondArray))
    },
    knownInvaderIntoArrays () {
      return this.knownInvaderSplitByNewLine().map(imagePixel => imagePixel.split(''))
    },

    createPixelHash () {
      let concatImageArrayIndex = 0;
      let startingPosition = 0;
      let radarImageArray = [];
      while (concatImageArrayIndex < this.concatRadarImageArray().length) {
        radarImageArray.push(this.concatRadarImageArray()[concatImageArrayIndex]);
        concatImageArrayIndex++;
        if (radarImageArray.length === this.knownInvaderIntoArrays()[0].length || concatImageArrayIndex > this.concatRadarImageArray().length - 1) {
          this.radarImageHashTable[startingPosition] = radarImageArray;
          startingPosition++;
          concatImageArrayIndex = startingPosition;
          radarImageArray = [];
        }
      }

      return this.searchForInvadersInImage();
    },

    searchForInvadersInImage () {
      let outerIndex = 0;
      let innerIndex = 0;
      let knownInvaderIndex = 0;
      let matchesMade = [];
      let checkMatchesMade;
      while (this.radarImageHashTable[outerIndex] && innerIndex < this.radarImageHashTable[outerIndex].length) {
        if (knownInvaderIndex >= this.knownInvaderIntoArrays().length) {
          break;
        }

        if (this.knownInvaderIntoArrays()[knownInvaderIndex][innerIndex] !== this.radarImageHashTable[outerIndex][innerIndex]) {
          outerIndex++;
          innerIndex = 0;
        } else if (innerIndex === this.radarImageHashTable[outerIndex].length - 1) {
          outerIndex += this.knownInvaderIntoArrays()[knownInvaderIndex].length;
          matchesMade.push(knownInvaderIndex);
          knownInvaderIndex++;
          innerIndex = 0;
        } else {
          innerIndex++;
        }
      }

      checkMatchesMade = matchesMade.length ? true : false;

      return checkMatchesMade;
    }
  }
  

  return handleImageSearch.createPixelHash();
}

module.exports = { searchImageForKnownInvaders };

