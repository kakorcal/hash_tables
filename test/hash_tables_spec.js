const expect = require("chai").expect
var HashTable = require('../hashTable');

 describe("Hash Table", function() {
   var table;
   var size;
   var prime;
   beforeEach(function() {
     size = 5;
     prime = 1;
     table = new HashTable(size, prime);
   });

   var strToCharCode = function(str) {
     return str.split("").reduce(function(acc, el) {
       return acc + el.charCodeAt(0);
     }, 0);
   }

   describe("new HashTable", function() {
     it("has the correct properties", function() {
       expect(Array.isArray(table.arr)).to.equal(true);
       expect(table.arr.length).to.equal(size);
       expect(table.prime).to.equal(prime);
     });
   });

   describe("__hashFunction", function() {
     it("hashes a number", function() {
       expect(table.__hashFunction(1)).to.equal(1)
       expect(table.__hashFunction(6)).to.equal(1)
       expect(table.__hashFunction(25)).to.equal(0)
     });

     it("hashes non numbers that are of type number", function() {
       var nanHash = strToCharCode("NaN") % size;
       expect(table.__hashFunction(NaN)).to.equal(nanHash);

       var infinityHash = strToCharCode("Infinity") % size;
       expect(table.__hashFunction(Infinity)).to.equal(infinityHash);
     });

     it("hashes a string", function() {
       expect(table.__hashFunction("aB=")).to.equal(strToCharCode("aB=")%size);
       expect(table.__hashFunction("zzzzzzzzz")).to.equal(strToCharCode("zzzzzzzzz")%size);
       expect(table.__hashFunction("")).to.equal(0);
     });

     it("hashes a function", function() {
       var f = function() {var i = 0; console.log(i);};
       var total = strToCharCode(f.toString());
       expect(table.__hashFunction(f)).to.equal(total % size);
     });

     it("hashes an object", function() {
       var hash = strToCharCode("{}") % size;
       expect(table.__hashFunction({})).to.equal(hash);
       expect(table.__hashFunction({a: 5}) !== hash).to.equal(true);
     });

     it("hashes an array", function() {
       var hash = strToCharCode("[]") % size;
       expect(table.__hashFunction([])).to.equal(hash);
       expect(table.__hashFunction([1,5,9,55]) !== hash).to.equal(true);
     })
   });

   describe("get, set and exists", function() {
     it("sets and gets a simple key", function() {
       var key = 1, value = "value";
       expect(table.set(key, value)).to.equal(undefined);
       expect(table.get(key)).to.equal(value);
     });

     it("exists returns true if a key exists in the hash, false otherwise", function() {
       var key = 1;
       expect(table.exists(key)).to.equal(false);
       expect(table.set(key, key)).to.equal(undefined);
       expect(table.exists(key)).to.equal(true);
     });

     it("can handle collisions", function() {
       var key1 = 0, key2 = 5, key3 = 10,
           val1 = 'a', val2 = 'b', val3 = 'c';
       expect(table.exists(key1)).to.equal(false);
       expect(table.exists(key2)).to.equal(false);
       expect(table.exists(key3)).to.equal(false);
       expect(table.set(key1, val1)).to.equal(undefined);
       expect(table.get(key1)).to.equal(val1);
       expect(table.set(key2, val2)).to.equal(undefined);
       expect(table.get(key1)).to.equal(val1);
       expect(table.get(key2)).to.equal(val2);
       expect(table.set(key3, val3)).to.equal(undefined);
       expect(table.get(key1)).to.equal(val1);
       expect(table.get(key2)).to.equal(val2);
       expect(table.get(key3)).to.equal(val3);
       expect(table.set(key3, 'test')).to.equal(undefined);
       expect(table.get(key3)).to.equal('test');
     });
   });

   describe("remove", function() {
     it("should have some tests", function() {
       // expect("Rewrite this section to have some real tests").to.equal(0);
     })
   });

 });