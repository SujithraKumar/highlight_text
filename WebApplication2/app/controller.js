angular
	.module('SearchApp')
	.controller('SearchController', ['$scope', '$rootScope', SearchController]);

function SearchController($scope, $rootScope) {

	// ****variable declaration*****
	$scope.NLPLists = [
		'send through mcash',
		'send money',
		'send cash',
		'transfer money',
		'mcash send money',
		'pay dollars',
		'payment failure',
		'pay euros',
		'pay in indaian currency',
		'get in pounds',
		'comfort paytm transfer',
		'cool fun'

	];

	$scope.paletterColors = [
		'blue',
		'purple',
		'yellow',
		'red',
		'brown',
		'pink',
		'black',
		'green'

	]

	$scope.currentPage = 0;
	$scope.pageSize = 10;
	$scope.search = '';
	$scope.value = "";
	$scope.position = 0;
	$scope.openPallet = false;
	var wordToBeColoured = '';
	$scope.UseAsLable = "";
	$scope.sentence = "";
	



	$scope.AddToNLPList = function (text) {
		if (text)
			$scope.NLPLists.unshift(text);

		$scope.search.text = '';

	}
	
	$scope.getElementPosition = function (sentence, position, event) {
		$scope.sentence = sentence;
		let userSelection;
		let startIndex = 0;
		let endIndex = 0;
		$scope.position = position;


		//text selection 
		if (window.getSelection) {
			userSelection = window.getSelection();
		}
		else if (document.selection) {
		
			userSelection = document.selection.createRange();
		}

		var selectedText = userSelection;
		if (userSelection.text)
			selectedText = userSelection.text;

		if (selectedText != '') {
			$scope.value = selectedText + '(' + event.pageX + '' + event.pageY+')';
		}
		
		$scope.extracted = $scope.value.substr(0, $scope.value.lastIndexOf("("));

		
		// index calculation for start and end index values
		var getIndexOfSelectedcontent = $scope.sentence.indexOf($scope.extracted);
		var endOfExtractedString = $scope.extracted.length;

		startIndex = $scope.getStartIndex(getIndexOfSelectedcontent);
		endIndex = $scope.getEndIndex((endOfExtractedString + getIndexOfSelectedcontent-1));
		
		wordToBeColoured = $scope.sentence.substr(startIndex, endIndex);

		
		if ($scope.extracted) {
			$scope.openPallet = true;
			$('#palletModal').modal('show');

		}

	}

	$scope.getStartIndex = function (getIndexOfSelectedcontent) {
		
		var startIndex = 0;
		while (getIndexOfSelectedcontent >= 0) {

			getIndexOfSelectedcontent -= 1
			if (getIndexOfSelectedcontent == 0) {
				startIndex = getIndexOfSelectedcontent;
				break;
			}

			if ($scope.sentence[getIndexOfSelectedcontent] == ' ') {
				startIndex = getIndexOfSelectedcontent + 1;
				break;
			}

		}

		return startIndex;

	}


	$scope.getEndIndex = function (endOfExtractedString) {
		
		var endIndex = 0;
		while (endOfExtractedString <= $scope.sentence.length) {
			endOfExtractedString += 1;
			if (endOfExtractedString == $scope.sentence.length) {
				endIndex = $scope.sentence.length;
				break;
			}

			if ($scope.sentence[endOfExtractedString] == ' ') {
				endIndex = endOfExtractedString + 1;
				break;
			}
		}
		return endIndex;
	}


	$scope.setContentBackground = function (color) {
		
		var inputText = document.getElementById("list_" + ($scope.position));
		var innerHTML = inputText.innerHTML;

		innerHTML = innerHTML.replace(wordToBeColoured, "<span style='background: " + color + ";'>" + wordToBeColoured + "</span>");
		inputText.innerHTML = innerHTML;
		$('#palletModal').modal('hide');
	}

	$scope.useAsLabel = function (list) {
		$scope.UseAsLable = list;
	}

	$scope.Delete = function (list) {

		let index = $scope.NLPLists.indexOf(list);

		if (index != -1)
			$scope.NLPLists.splice(index,1);
		
	}


	// paginator:

	$scope.numberOfPages = function () {
		return Math.ceil($scope.NLPLists.length / $scope.pageSize);
	}
	

	

	
};