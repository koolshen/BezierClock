;(function () {
	this.bezierClock = function () {

		var defaults = {
			color : 'red',
			lineWidth : 1,
			scale : 0.1,
			transformationTime : 100,
		}

		function extendDefaults(source, properties) {
			var property;
			for (property in properties) {
				if (properties.hasOwnProperty(property)) {
					source[property] = properties[property];
				}
			}
			return source;
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}

		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		var width = canvas.width = window.innerWidth;
		var height = canvas.height = window.innerHeight;
		var pointsOffset = [1 * defaults.scale, 200 * defaults.scale, 450 * defaults.scale, 650 * defaults.scale, 900 * defaults.scale, 1100 * defaults.scale];
		var currentTimeDigit = [];

		try {
			document.getElementById('bclock').appendChild(canvas);
		} catch (err) {
			console.warn('Error during initilization BezierClock plugin. Please check if you have div with id="bclock" id ');
		}

	var points = [
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 455, y: 385}, {x: 489, y: 174}, {x: 472, y: 214}, {x: 354, y: 338}, {x: 455, y: 385}, {x: 452, y: 461}, {x: 456, y: 461}, {x: 456, y: 530}],
	[{x: 468, y: 405}, {x: 594, y: 293}, {x: 399, y: 157}, {x: 342, y: 333}, {x: 468, y: 405}, {x: 183, y: 588}, {x: 492, y: 526}, {x: 532, y: 530}],	
	[{x: 414, y: 387}, {x: 622, y: 327}, {x: 399, y: 157}, {x: 347, y: 317}, {x: 414, y: 387}, {x: 660, y: 396}, {x: 407, y: 673}, {x: 353, y: 472}],
	[{x: 489, y: 239}, {x: 579, y: 382}, {x: 285, y: 529}, {x: 335, y: 248}, {x: 489, y: 239}, {x: 442, y: 504}, {x: 483, y: 467}, {x: 486, y: 543}],
	[{x: 398, y: 376}, {x: 306, y: 390}, {x: 296, y: 191}, {x: 542, y: 265}, {x: 398, y: 376}, {x: 683, y: 340}, {x: 475, y: 663}, {x: 355, y: 490}],
	[{x: 353, y: 416}, {x: 327, y: 311}, {x: 423, y: 164}, {x: 511, y: 312}, {x: 353, y: 416}, {x: 410, y: 729}, {x: 652, y: 335}, {x: 353, y: 416}],
	[{x: 444, y: 379}, {x: 509, y: 290}, {x: 611, y: 237}, {x: 335, y: 258}, {x: 444, y: 379}, {x: 382, y: 465}, {x: 410, y: 511}, {x: 402, y: 546}],
	[{x: 429, y: 383}, {x: 613, y: 233}, {x: 266, y: 159}, {x: 429, y: 383}, {x: 429, y: 383}, {x: 183, y: 588}, {x: 672, y: 602}, {x: 429, y: 383}],
	[{x: 488, y: 297}, {x: 375, y: 124}, {x: 243, y: 547}, {x: 488, y: 297}, {x: 488, y: 297}, {x: 599, y: 507}, {x: 372, y: 616}, {x: 353, y: 481}],
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}]
	]	

	var currentPoints = [
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}],	
	[{x: 511, y: 410}, {x: 540, y: 261}, {x: 364, y: 120}, {x: 349, y: 403}, {x: 511, y: 410}, {x: 504, y: 573}, {x: 357, y: 593}, {x: 349, y: 403}]
	]  

		points.forEach(function (object) {
			object.forEach(function (point) {
				point.x = point.x * defaults.scale;
				point.y = point.y * defaults.scale;
			})
		})

		currentPoints.forEach(function (object) {
			object.forEach(function (point) {
				point.x = point.x * defaults.scale;
				point.y = point.y * defaults.scale;
			})
		})

		function placeDigits() {
			var today = new Date();
			var h = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
			var m = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
			var s = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
			var digits = [h.toString().substring(0, 1), h.toString().substring(1, 2), m.toString().substring(0, 1), m.toString().substring(1, 2), s.toString().substring(0, 1), s.toString().substring(1, 2)];

			context.clearRect(0, 0, width, height);
			for (var i = 0; i < 6; i++) {
				place(currentPoints[i], pointsOffset[i]);
				animate(currentPoints[i], points[digits[i]], defaults.transformationTime, 0);
			}
			requestAnimationFrame(placeDigits);
		}

		function place(points, offset) {
			context.beginPath();

			context.moveTo(points[0].x + offset, points[0].y);
			context.lineWidth = defaults.lineWidth;
			context.strokeStyle = defaults.color;

			for (var t = 0; t <= maxT; t += 0.01) {
				cubicBezier(points[0], points[1], points[2], points[3], t, pFinal);
				context.lineTo(pFinal.x + offset, pFinal.y);
			}
			context.stroke();
			context.beginPath();
			context.moveTo(points[4].x + offset, points[4].y);
			for (var t = 0; t <= maxT; t += 0.01) {
				cubicBezier(points[4], points[5], points[6], points[7], t, pFinal);
				context.lineTo(pFinal.x + offset, pFinal.y);
			}
			context.stroke();
		}

		var animate = function (origin, destination, duration, offset) {
			var start = new Date().getTime();
			var end = start + duration;
			var currentX = [];
			var currentY = [];
			var distanceX = [];
			var distanceY = [];

			for (var i = 0; i < 8; i++) {
				currentX[i] = origin[i].x;
				currentY[i] = origin[i].y;
				distanceX[i] = (destination[i].x + offset) - currentX[i];
				distanceY[i] = destination[i].y - currentY[i];
			}

			var step = function () {
				var timestamp = new Date().getTime();
				var progress = Math.min((duration - (end - timestamp)) / duration, 1);
				for (var i = 0; i < 8; i++) {
					origin[i].x = (currentX[i] + (distanceX[i] * progress));
					origin[i].y = (currentY[i] + (distanceY[i] * progress));
				}
				if (progress < 1) {
					requestAnimationFrame(step)
				}
			};
			return step();
		};

		var cubicBezier = function (p0, p1, p2, p3, t, pFinal) {
			pFinal = pFinal || {};
			pFinal.x = Math.pow(1 - t, 3) * p0.x +
				Math.pow(1 - t, 2) * 3 * t * p1.x +
				(1 - t) * 3 * t * t * p2.x +
				t * t * t * p3.x;
			pFinal.y = Math.pow(1 - t, 3) * p0.y +
				Math.pow(1 - t, 2) * 3 * t * p1.y +
				(1 - t) * 3 * t * t * p2.y +
				t * t * t * p3.y;
			return pFinal;
		}

		maxT = 1,
		pFinal = {};
		placeDigits();
		for (var i = 0; i < 6; i++) {
			animate(currentPoints[i], points[i], 1, 0)
		}
	}
}	());