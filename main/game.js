
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------JAVASCRIPT ASSIGNMENT TERM TWO -- DIWAS LAMSAL -- 18406547 -------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//

// Some globally declared variables

	var i = 1;
	var lapDisplay;
	var statusMessage;
	var winnerDisplay;
	var mainTheme = new Audio("main-theme.mp3"); //The background music

	// Event System Variables
	var allRacers = [];
	var eventTimer = null;
	var eventNotification = null;
	var activeEffects = {}; // Track active effects per horse


// This is the audio control widget and the main theme itself 
// The different buttons have different features added to them
// Some play or pause the audio, some raise or reduce the volume while some mute or unmute the audio

	function playAudio(){
	   	mainTheme.loop = true;
	   	mainTheme.volume = 0.5;
	   	mainTheme.play();
   }
// End of audio control functions and the audio properties


/* 
* As OOP concepts have been followed, the following function creates racer objects which can take part in the race
* and have different behaviors and values
* The objects need to have five values passed as arguments these being the id, left position, top position, the number or the number in the id
* and the number of laps. The number of laps is taken from the input box and does not have to be entered manually, but is passed as a 
* variable.
*
*/

	function racer(horseId, left, top, number, laps, name){

		this.element = document.getElementById(horseId);//The id for respective racers: horse numbers
		this.left = left;
		this.top = top;
		this.number = number;
		this.name = name;
		this.interval = 0;
		this.positions;
		this.laps = laps;
		this.speedInterval = 0;

		// RESET position to start - IMPORTANT!
		this.element.style.left = this.left + 'vw';
		this.element.style.top = this.top + 'vh';
		this.element.className = 'horse standRight';

		// Clear any visual effects from previous race
		this.element.classList.remove('speedBoost', 'speedSlow', 'warpEffect', 'stumbleEffect');

// Different functions for the racers objects. These define the direction and speed of the horses and other features.
// The speeds of the horses are set so that they change every second.

// The runRight function which defines the running property of the horse towards the right direction. In case the end of the path is reached, the horse
// changes its direction to the upward direction.

		this.runRight = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runRight';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingRight, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingRight, racers.speed);
			}, 1000);

			function movingRight(){
				racers.left += 0.2;
				if(racers.left >= 80 + racers.number*2.8){
					racers.runUp();
				}
				racers.element.style.left = racers.left +'vw';
			}
			
		}


// The runUp function which defines the running property of the horse towards the up direction. In case the end of the path is reached, the horse
// changes its direction to the left direction.

	
		this.runUp = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runUp';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingUp, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingUp, racers.speed);
			}, 1000);
				function movingUp(){
					racers.top -= 0.2;
					if(racers.top <= 1 + racers.number*2.8){
						racers.runLeft();
					}
					racers.element.style.top = racers.top + 'vh';
				
				}
		}


// The runLeft function which defines the running property of the horse towards the left direction. In case the end of the path is reached, the horse
// changes its direction to the downward direction.


		this.runLeft = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runLeft';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingLeft, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingLeft, racers.speed);
			}, 1000);		
				
			function movingLeft(){
				racers.left -= 0.2;
				if(racers.left <= -3 + racers.number*2.8){
					racers.runDown();
				}
				racers.element.style.left = racers.left +'vw';

			}
		}

/*
*
* The runDown function which defines the running property of the horse towards the downward direction. In case the end of the path is reached, the horse
* changes its direction to the right direction, but, if the number of laps is complete, the finishLine function is called which performs a separate action
* whereas when the number of laps are not completed, this function calls the runRight function. Which would be repeating these functions once again.
*
*/

		this.runDown = function() {
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runDown';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingDown, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingDown, racers.speed);
			}, 1000);	

			function movingDown(){
				racers.top += 0.2;
				if(racers.top >= 74 + racers.number*2.8){
					if(racers.laps > 1){
						racers.runRight();
					}
					else{
						racers.finishLine();
					}
					racers.laps--;
					setTimeout(function(){lapDisplay.innerHTML = "Vòng còn lại: " + racers.laps;}, 1500);
				}
				racers.element.style.top = racers.top + 'vh';
			}


		}


// The finishLine function which defines the stop point of the race. All the horses stop once they complete the required laps and reach the finish line.
// This also displays the results in the result box. That is, it displays the respective heads against the 1st, 2nd, 3rd and 4th positions.

		this.finishLine = function(){
			var racers = this;
			clearInterval(racers.interval);
			clearInterval(racers.speedInterval);
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.element.className = 'horse runRight';
			racers.interval = setInterval(finishingRace, racers.speed);
			racers.positions = document.getElementsByTagName('td');

			// Calculate original starting vertical position
			var targetTop = 70 + racers.number * 6;  // 76, 82, 88, 94vh

			function finishingRace(){
				racers.left += 0.2;

				// Move horse back to original vertical position
				if (racers.top > targetTop) {
					racers.top -= 0.3;
					if (racers.top < targetTop) racers.top = targetTop;
				} else if (racers.top < targetTop) {
					racers.top += 0.3;
					if (racers.top > targetTop) racers.top = targetTop;
				}
				racers.element.style.top = racers.top + 'vh';

				if(racers.left >= 30){  // Dừng đúng tại vị trí xuất phát (30vw)
					racers.element.className = 'horse standRight';
					clearInterval(racers.interval);
					racers.positions[i].className = 'horse' + racers.number;
					if (i == 1 && winnerDisplay){
						winnerDisplay.innerHTML = "🏆 Người chiến thắng: " + racers.name;
					}
					i+=2;

				}
				racers.element.style.left = racers.left +'vw';
					
				if(i>7){
					lapDisplay.style.opacity=0;
					startButton = document.getElementById('start');
					startButton.className = "";

					document.getElementById('lapNumber').readOnly = false;
					if(statusMessage){
						statusMessage.style.color = "green";
						statusMessage.innerHTML = "Kết thúc cuộc đua!";
					}

					// Stop the event system when race finishes
					stopEventSystem();
				}

			}
			
		}
			

// The function for starting the race. When the function is called, the race begins.
		this.startRace = function(){
			this.runRight();
		}

	}


//========================================= EVENT SYSTEM =========================================//

// Show notification in center of screen
function showNotification(message) {
	if (!eventNotification) {
		eventNotification = document.getElementById('eventNotification');
	}

	eventNotification.innerHTML = message;
	eventNotification.classList.add('show');

	setTimeout(function() {
		eventNotification.classList.remove('show');
	}, 2000);
}

// Apply Speed Boost Event
function applySpeedBoost(racer) {
	if (!racer || racer.laps <= 0) return; // Don't apply if race finished

	// Mark this racer as having active effect
	activeEffects[racer.number] = 'speedBoost';

	// Clear existing speed randomizer
	clearInterval(racer.speedInterval);
	clearInterval(racer.interval);

	// Set new fast speed
	racer.speed = 4;

	// Add visual effect
	racer.element.classList.add('speedBoost');

	// Create speed lines/particles effect
	var particleInterval = setInterval(function() {
		if (racer.element && activeEffects[racer.number] === 'speedBoost') {
			var particle = document.createElement('div');
			particle.className = 'speedParticle';
			particle.style.position = 'absolute';
			particle.style.left = racer.left + 'vw';
			particle.style.top = racer.top + 'vh';
			document.body.appendChild(particle);

			setTimeout(function() {
				if (particle.parentNode) {
					particle.parentNode.removeChild(particle);
				}
			}, 500);
		}
	}, 100);

	// Keep reapplying effect class every 100ms to survive direction changes
	var effectInterval = setInterval(function() {
		if (racer.element && activeEffects[racer.number] === 'speedBoost') {
			racer.element.classList.add('speedBoost');
		}
	}, 100);

	// Restart movement with new speed
	var currentDirection = racer.element.className;
	if (currentDirection.includes('runRight')) {
		racer.interval = setInterval(function() {
			racer.left += 0.2;
			if (racer.left >= 80 + racer.number * 2.8) {
				racer.runUp();
			}
			racer.element.style.left = racer.left + 'vw';
		}, racer.speed);
	} else if (currentDirection.includes('runLeft')) {
		racer.interval = setInterval(function() {
			racer.left -= 0.2;
			if (racer.left <= 0 + racer.number * 2.8) {
				racer.runDown();
			}
			racer.element.style.left = racer.left + 'vw';
		}, racer.speed);
	} else if (currentDirection.includes('runUp')) {
		racer.interval = setInterval(function() {
			racer.top -= 0.2;
			if (racer.top <= 3 + racer.number * 2.8) {
				racer.runLeft();
			}
			racer.element.style.top = racer.top + 'vh';
		}, racer.speed);
	} else if (currentDirection.includes('runDown')) {
		racer.interval = setInterval(function() {
			racer.top += 0.2;
			if (racer.top >= 74 + racer.number * 2.8) {
				if (racer.laps > 1) {
					racer.runRight();
				} else {
					racer.finishLine();
				}
				racer.laps--;
			}
			racer.element.style.top = racer.top + 'vh';
		}, racer.speed);
	}

	showNotification("💰 " + racer.name + " được thưởng!");

	// Remove effect after 3 seconds and restore normal speed randomizer
	setTimeout(function() {
		clearInterval(effectInterval);
		clearInterval(particleInterval);
		delete activeEffects[racer.number];
		racer.element.classList.remove('speedBoost');
		// Restore normal speed randomizer
		if (currentDirection.includes('runRight')) {
			racer.runRight();
		} else if (currentDirection.includes('runLeft')) {
			racer.runLeft();
		} else if (currentDirection.includes('runUp')) {
			racer.runUp();
		} else if (currentDirection.includes('runDown')) {
			racer.runDown();
		}
	}, 3000);
}

// Apply Speed Slow Event
function applySpeedSlow(racer) {
	if (!racer || racer.laps <= 0) return;

	// Mark this racer as having active effect
	activeEffects[racer.number] = 'speedSlow';

	// Clear existing speed randomizer
	clearInterval(racer.speedInterval);
	clearInterval(racer.interval);

	// Set new slow speed
	racer.speed = 26;

	// Add visual effect
	racer.element.classList.add('speedSlow');

	// Create smoke/weight particles effect
	var smokeInterval = setInterval(function() {
		if (racer.element && activeEffects[racer.number] === 'speedSlow') {
			var smoke = document.createElement('div');
			smoke.className = 'smokeParticle';
			smoke.style.position = 'absolute';
			smoke.style.left = racer.left + 'vw';
			smoke.style.top = racer.top + 'vh';
			document.body.appendChild(smoke);

			setTimeout(function() {
				if (smoke.parentNode) {
					smoke.parentNode.removeChild(smoke);
				}
			}, 800);
		}
	}, 150);

	// Keep reapplying effect class every 100ms to survive direction changes
	var effectInterval = setInterval(function() {
		if (racer.element && activeEffects[racer.number] === 'speedSlow') {
			racer.element.classList.add('speedSlow');
		}
	}, 100);

	// Restart movement with new speed
	var currentDirection = racer.element.className;
	if (currentDirection.includes('runRight')) {
		racer.interval = setInterval(function() {
			racer.left += 0.2;
			if (racer.left >= 80 + racer.number * 2.8) {
				racer.runUp();
			}
			racer.element.style.left = racer.left + 'vw';
		}, racer.speed);
	} else if (currentDirection.includes('runLeft')) {
		racer.interval = setInterval(function() {
			racer.left -= 0.2;
			if (racer.left <= 0 + racer.number * 2.8) {
				racer.runDown();
			}
			racer.element.style.left = racer.left + 'vw';
		}, racer.speed);
	} else if (currentDirection.includes('runUp')) {
		racer.interval = setInterval(function() {
			racer.top -= 0.2;
			if (racer.top <= 3 + racer.number * 2.8) {
				racer.runLeft();
			}
			racer.element.style.top = racer.top + 'vh';
		}, racer.speed);
	} else if (currentDirection.includes('runDown')) {
		racer.interval = setInterval(function() {
			racer.top += 0.2;
			if (racer.top >= 74 + racer.number * 2.8) {
				if (racer.laps > 1) {
					racer.runRight();
				} else {
					racer.finishLine();
				}
				racer.laps--;
			}
			racer.element.style.top = racer.top + 'vh';
		}, racer.speed);
	}

	showNotification("📉 " + racer.name + " bị giảm lương!");

	// Remove effect after 3 seconds and restore normal speed randomizer
	setTimeout(function() {
		clearInterval(effectInterval);
		clearInterval(smokeInterval);
		delete activeEffects[racer.number];
		racer.element.classList.remove('speedSlow');
		// Restore normal speed randomizer
		if (currentDirection.includes('runRight')) {
			racer.runRight();
		} else if (currentDirection.includes('runLeft')) {
			racer.runLeft();
		} else if (currentDirection.includes('runUp')) {
			racer.runUp();
		} else if (currentDirection.includes('runDown')) {
			racer.runDown();
		}
	}, 3000);
}

// Apply Warp Forward Event
function applyWarpForward(racer) {
	if (!racer || racer.laps <= 0) return;

	showNotification("📈 " + racer.name + " bị gọi về đón con!");

	// Store original position for after-images
	var originalLeft = racer.left;
	var originalTop = racer.top;

	// INCREASED warp distance to 10 for much more visible effect
	var warpAmount = 10;
	var className = racer.element.className;

	// Create multiple after-images for trail effect (5 images)
	for (var i = 0; i < 5; i++) {
		(function(index) {
			setTimeout(function() {
				var afterImage = document.createElement('div');
				afterImage.className = 'warpAfterImage';
				afterImage.style.position = 'absolute';
				afterImage.style.left = originalLeft + 'vw';
				afterImage.style.top = originalTop + 'vh';
				afterImage.style.width = racer.element.offsetWidth + 'px';
				afterImage.style.height = racer.element.offsetHeight + 'px';
				afterImage.style.backgroundImage = racer.element.style.backgroundImage || window.getComputedStyle(racer.element).backgroundImage;
				afterImage.style.backgroundPosition = window.getComputedStyle(racer.element).backgroundPosition;
				afterImage.style.backgroundSize = window.getComputedStyle(racer.element).backgroundSize;
				afterImage.style.animationDelay = (index * 0.05) + 's';
				document.body.appendChild(afterImage);

				// Remove after-image after animation
				setTimeout(function() {
					if (afterImage.parentNode) {
						afterImage.parentNode.removeChild(afterImage);
					}
				}, 1000);
			}, index * 30); // Stagger creation by 30ms
		})(i);
	}

	// Add strong visual effect
	racer.element.classList.add('warpEffect');

	// Create lightning flash effect
	var flash = document.createElement('div');
	flash.className = 'warpFlash';
	flash.style.position = 'absolute';
	flash.style.left = originalLeft + 'vw';
	flash.style.top = originalTop + 'vh';
	flash.style.width = '100px';
	flash.style.height = '100px';
	flash.style.pointerEvents = 'none';
	flash.style.zIndex = '9998';
	document.body.appendChild(flash);
	setTimeout(function() {
		if (flash.parentNode) {
			flash.parentNode.removeChild(flash);
		}
	}, 600);

	if (className.includes('runRight')) {
		racer.left += warpAmount;
		racer.element.style.left = racer.left + 'vw';
		// Check if need to turn
		if (racer.left >= 80 + racer.number * 2.8) {
			racer.runUp();
		}
	} else if (className.includes('runLeft')) {
		racer.left -= warpAmount;
		racer.element.style.left = racer.left + 'vw';
		// Check if need to turn
		if (racer.left <= 0 + racer.number * 2.8) {
			racer.runDown();
		}
	} else if (className.includes('runUp')) {
		racer.top -= warpAmount;
		racer.element.style.top = racer.top + 'vh';
		// Check if need to turn
		if (racer.top <= 3 + racer.number * 2.8) {
			racer.runLeft();
		}
	} else if (className.includes('runDown')) {
		racer.top += warpAmount;
		racer.element.style.top = racer.top + 'vh';
		// Check if crossed finish line or need to turn
		if (racer.top >= 74 + racer.number * 2.8) {
			if (racer.laps > 1) {
				racer.laps--;
				racer.runRight();
			} else {
				racer.finishLine();
			}
		}
	}

	// Remove effect after animation (longer duration)
	setTimeout(function() {
		racer.element.classList.remove('warpEffect');
	}, 1000);
}

// Apply Stumble Event - Stop in place
function applyStumble(racer) {
	if (!racer || racer.laps <= 0) return;

	// Stop the horse completely
	clearInterval(racer.interval);
	clearInterval(racer.speedInterval);

	// Add visual effect
	racer.element.classList.add('stumbleEffect');

	// Create dizzy stars effect
	for (var i = 0; i < 8; i++) {
		(function(index) {
			var star = document.createElement('div');
			star.className = 'dizzyStar';
			star.innerHTML = '⭐';
			star.style.position = 'absolute';
			star.style.left = racer.left + 'vw';
			star.style.top = racer.top + 'vh';
			star.style.fontSize = '20px';
			star.style.animationDelay = (index * 0.15) + 's';
			star.style.zIndex = '1000';
			document.body.appendChild(star);

			setTimeout(function() {
				if (star.parentNode) {
					star.parentNode.removeChild(star);
				}
			}, 1500);
		})(i);
	}

	showNotification("⬇️ " + racer.name + " đứng lại tám chuyện!");

	// Store current direction
	var className = racer.element.className;

	// Resume movement after 1.5 seconds
	setTimeout(function() {
		racer.element.classList.remove('stumbleEffect');

		// Resume racing based on previous direction
		if (className.includes('runRight')) {
			racer.runRight();
		} else if (className.includes('runLeft')) {
			racer.runLeft();
		} else if (className.includes('runUp')) {
			racer.runUp();
		} else if (className.includes('runDown')) {
			racer.runDown();
		}
	}, 1500);
}

// Trigger Random Event
function triggerRandomEvent() {
	if (allRacers.length === 0) return;

	// Select random racer
	var randomIndex = Math.floor(Math.random() * allRacers.length);
	var targetRacer = allRacers[randomIndex];

	// Check if racer is still racing
	if (!targetRacer || targetRacer.laps <= 0) return;

	// Select random event type with weighted probability
	var eventRoll = Math.random();

	if (eventRoll < 0.3) {
		// 30% Speed Boost
		applySpeedBoost(targetRacer);
	} else if (eventRoll < 0.6) {
		// 30% Speed Slow
		applySpeedSlow(targetRacer);
	} else if (eventRoll < 0.8) {
		// 20% Warp Forward
		applyWarpForward(targetRacer);
	} else {
		// 20% Stumble
		applyStumble(targetRacer);
	}
}

// Start Event System
function startEventSystem() {
	// Clear any existing timer
	if (eventTimer) {
		clearInterval(eventTimer);
	}

	// Start triggering events every 6 seconds
	eventTimer = setInterval(triggerRandomEvent, 6000);
}

// Stop Event System
function stopEventSystem() {
	if (eventTimer) {
		clearInterval(eventTimer);
		eventTimer = null;
	}
}

//========================================= END EVENT SYSTEM =========================================//


//----------------------------------------INSERT ALL THE CODES HERE FOR WHAT HAPPENS WHEN THE WINDOW LOADS-------------------------------------//
window.onload = function() {
	
// The button that removes the modal dispalyed on game startup
	var playButton = document.getElementById('playButton');
	playButton.onclick = function(){
		var modal = document.getElementById('modal');
		modal.style.opacity=0;
		setTimeout(function(){modal = document.getElementById('modal'); modal.style.display="none";}, 1000);
		playAudio();	
	
	}
	
// The countdown tick audio
	var countDownAudio = new Audio("Resources/Countdown.mp3");//Tick sound for countdown
	countDownAudio.volume = 1;

// The start race button
	var startButton = document.getElementById('start');
	startButton.addEventListener('click', startRace);


// The startRace function starts the race or halts it if some validation erros exist
	function startRace(){
		// Stop any existing event system from previous race
		stopEventSystem();

		// Clear any active effects
		activeEffects = {};

		// Clear all existing intervals from previous race
		if (allRacers && allRacers.length > 0) {
			for (var k = 0; k < allRacers.length; k++) {
				if (allRacers[k]) {
					clearInterval(allRacers[k].interval);
					clearInterval(allRacers[k].speedInterval);
				}
			}
		}

		var laps = parseInt(document.getElementById('lapNumber').value);

		var racer1 = new racer('horse1', 30, 76, 1, laps, 'Anh Huy');
		var racer2 = new racer('horse2', 30, 82, 2, laps, 'Anh Trường');
		var racer3 = new racer('horse3', 30, 88, 3, laps, 'Anh Nhân');
		var racer4 = new racer('horse4', 30, 94, 4, laps, 'Chị Thu Trang');

		// Save racers for event system
		allRacers = [racer1, racer2, racer3, racer4];

		var countDown = document.getElementById('countDown');
		statusMessage = document.getElementById('status');
		winnerDisplay = document.getElementById('winner');
		if(winnerDisplay) winnerDisplay.innerHTML = "🏆 Người chiến thắng: ?";


// The validation tests
		if (laps<1 || isNaN(laps)){
			if(statusMessage){
				statusMessage.style.color = "red";
				statusMessage.innerHTML = "* Số vòng không hợp lệ!";
			}
		}


// This part is executed only when the inputs are valid. This part starts the race. 
		else if(this.className != "start"){
			this.className = "start";

// Disable the inputs when the race begins
			document.getElementById('lapNumber').readOnly = true;
			lapDisplay = document.getElementById('lapDisplay');
			lapDisplay.style.opacity=1;
			lapDisplay.innerHTML = "Vòng còn lại: " + laps;

			if(statusMessage){
				statusMessage.style.color = "green";
				statusMessage.innerHTML = "Chuẩn bị xuất phát...";
			}
			var x = 3;
			interval = setInterval(countDownTimer, 1000);

			function begin(){
				console.log("BEGIN FUNCTION CALLED!");
				console.log("Racer1:", racer1);
				console.log("Racer2:", racer2);
				console.log("Racer3:", racer3);
				console.log("Racer4:", racer4);
				racer1.startRace();
				racer2.startRace();
				racer3.startRace();
				racer4.startRace();
				console.log("All racers started!");
			}

			i = 1;

// This clears the position leaderboard for the new race
			var positions = document.getElementsByTagName('td');
			for (var j = 1; j < positions.length; j++)positions[j].className = '';
		}

// The countdown timer. Every second, the timer value is reduced by one and when it is 1, goFunction is called.
			function countDownTimer(){
				countDown.style.display = "block";	
				countDown.style.opacity = 1;	
				countDownAudio.play();
				countDown.innerHTML=x;
				if (x<1) {
					clearInterval(interval);
					goFunction();	
				}
				x--;
			}

// The race is setup to start only after the "Go!" text fades.
			function goFunction(){
				countDown.innerHTML="Go!";
				setTimeout(function(){
					countDown.style.opacity = 0;
					begin();
					// Start the event system when race begins
					startEventSystem();
				}, 1500);  // Changed from 500ms to 1500ms (1.5 seconds delay)
			}

	}

}
