# highlight_text

For Understanding the code:


Main file : views/Home/index.cshtml	
		Index file has the controller "search controller"  and a directive <searchlist></searchlist>

Directive: app/directive.js
o	Holds the element search list which holds the functionality
o	It extends the elements present in the templateURL
o	Could have binded all the dependent function in link funciton, but for time being the funcitons are in main controller which could be brought to driective's link funtion .

Search.hmtl : app/search/search.html
	Holds all the functionality namely,
	Adding the text
	Labelling
	search
	Highlight
	Remove Highlight
	delete
	
	Have made all the functionalities generic by creating function though it could have been just a line change for code maintainability. For example: for labelling in line 17, i could have just assigned "USELABEL" model value to the given value (like ng-click="uselabel = list") rather then writing a function, but to maintain the structure, i have moved it into a funciton.

controller : app/controller.js
	Have hardcoded text list and pallete color list as i have not connected to any backends.	Have list of 10 functions for performing all these operations.
	
	
	$scope.AddToNLPList -- for adding the text to the list
$scope.getElementPosition - to get the selected words positions for highlighting
$scope.getStartIndex -  fetching the start index of the code . could have coded in         $scope.getElementPosition, but to avoid more lines of code in one function which makes  readability difficuly, have broken down into 2 fucntions.
	$scope.getEndIndex  - fetching the end index of the word.
	$scope.setContentBackground --- highlighting the selected word.
	$scope.useAsLabel -- to set the given text as label
	$scope.Delete   -  Delete the text from the list
	$scope.numberOfPages -- calculate pages. could  written a separate directive for paginator had it been dealing with complex data, now that the requirement is simple , went with a simple one.

I have not used font awesome icons, I have rather used bootstrap buttons , in delete.

		Have also attached a video demonstrating the functionalities...  Hope that helps

