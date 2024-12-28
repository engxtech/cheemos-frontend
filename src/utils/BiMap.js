class BiMap {
    constructor() {
      this.numToStr = {};
      this.strToNum = {};
    }
  
    // Add a mapping
    addMapping(number, string) {
      this.numToStr[number] = string;
      this.strToNum[string] = number;
    }
  
    // Get string from number
    getString(number) {
      return this.numToStr[number];
    }
  
    // Get number from string
    getNumber(string) {
      return this.strToNum[string];
    }
  }

  export default BiMap