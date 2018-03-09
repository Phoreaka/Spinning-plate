var container, stats, plate, plateTwo;

            //loading objects into scene
			var camera, scene, renderer, plate, plateTwo, controls; //loading objects into scene
            
            


            
            //Pause button toggle-Boolean for start and restart
            var initAnim = true;
            var runAnim = false;
            var isPlay = true;




            //tweening
           
			init();
			animate();


            //init functions for all the scene
			function init() {
                
				container = document.createElement( 'canvas' ); //creates div and inside of it canvas
				document.body.appendChild( container );
        
                        
				// scene
				scene = new THREE.Scene();  
                
                //camera
				camera = new THREE.PerspectiveCamera( 40,window.innerWidth / window.innerHeight, 100, 100000 );
				camera.position.set( 0, 0, 1000 );
                
                
                //lights
				var ambient = new THREE.AmbientLight( 0xFFFFf3, 1.1 );
                ambient.position.set( 0, 0, 900 ).normalize();
				scene.add( ambient );
				var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
				directionalLight.position.set( 0, 0, 700 ).normalize();
				scene.add( directionalLight );
                var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
				directionalLight.position.set( 0, 0, -700 ).normalize();
				scene.add( directionalLight );
                
                //lights end
                
                
                
                //setting renderer
                renderer = new THREE.WebGLRenderer({
                    alpha: true});//background opacity
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );
                
                //setting render end
                
                //orbit controls
				controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.target = new THREE.Vector3(-300,0,0);
                controls.minPolarAngle = 1; // radians
                controls.maxPolarAngle = Math.PI/2; // radians
				controls.minDistance = 500;
				controls.maxDistance = 800;
                controls.enablePan = false;
                //orbit controls end
                
                
                // model blue
				    var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) { };
				THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() ); //helper for texture loading
                
                //texture loader
				var mtlLoader = new THREE.MTLLoader();
                mtlLoader.crossOrigin = ''; //cross origin-allows to run it on github
				mtlLoader.setPath( 'images/new/' );
				mtlLoader.load( 'BluePlate.mtl', function( materials ) {
				materials.preload();
               
                //model loader
				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials( materials );
				objLoader.setPath( 'images/new/' );
				objLoader.load( 'BluePlate.obj', addPlate);
				});
                
                
                //object position setings
                var addPlate = function(object){
	            plate = object;
				plate.name = 'blue_plate';
                //Move the plate in the scene
	            plate.rotateX(0);
                plate.rotateY(0);
                plate.rotateZ(30);
                plate.position.x = -300;
	            plate.position.y = 0;
	            plate.position.z = 0;
                plate.scale.y = 1.8;
                plate.scale.x = 1.8;
                plate.scale.z = 1.8;
	
                //Add the 3D object in the scene
                
                scene.add(plate);//adds the plate
                animate(plate);
                render();
                };
                    
                //model blue end
                
                
                //model Polychrome inside of button function appears only when "#polychrome is pressed"
               
                    var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) { };
				THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() ); //helper for texture loading
                
                //texture loader
				var mtlLoaderTwo = new THREE.MTLLoader();
                mtlLoaderTwo.crossOrigin = ''; //cross origin-allows to run it on github
				mtlLoaderTwo.setPath( 'images/new/' );
				mtlLoaderTwo.load( 'PolychromePlate.mtl', function( materials ) {
				materials.preload();
                
               
                //model loader
				var objLoaderTwo = new THREE.OBJLoader();
				objLoaderTwo.setMaterials( materials );
				objLoaderTwo.setPath( 'images/new/' );
				objLoaderTwo.load( 'PolychromePlate.obj', addPlateTwo);
				});
                
                
                //object position setings
                var addPlateTwo = function(object){
	            plateTwo = object;
	            plateTwo.name = "color_plate";
                //Move the plate in the scene
	            plateTwo.rotateX(0);
                plateTwo.rotateY(0);
                plateTwo.rotateZ(30);
                plateTwo.position.x = -300;
	            plateTwo.position.y = 0;
	            plateTwo.position.z = 0;
                plateTwo.scale.y = 1.8;
                plateTwo.scale.x = 1.8;
                plateTwo.scale.z = 1.8;
				}    
                
                //polychrome model end
				
				
                //Add the 3D object in the scene 
				var changeTexture = function(){
                if(!(scene.getObjectByName('color_plate')))
				   {	   
                    scene.remove(plate);//removes the blue plate from scene
					scene.add(plateTwo);
					animate(plateTwo);
					render();
				   }

                };
                    
                
                //function for button blue to switch back to blue texture
                function changeTextureBlue(){
                   if(!(scene.getObjectByName('blue_plate')))
				   {	   
				   scene.add(plate);
                    scene.remove(plateTwo);//removes the polychrome
				   }
                }
                
                
                
                //mouse click - running the functions of button click need to appear after the model load
                document.getElementById('polychrome').addEventListener('click', changeTexture, false);
                document.getElementById('blue').addEventListener('click', changeTextureBlue, false);
                //mouse click end
                
                //pause toggle
                var startButton = document.getElementById( 'PausePlay' );

                // Start Button
                startButton.onclick = function StartAnimation() {

                    // Start and Pause 
                    if (runAnim) { 
                        startButton.innerHTML = 'Pause';
                        runAnim = false;
                        isPlay = true;
                        animate();
                    } else {
                        startButton.innerHTML = 'Play';
                        runAnim = true;
                        isPlay = false;
        
                    }
                }//pause toggle end
                
                
                
                
			} // init ends
            
                
            
            //settings for window resize

                function onWindowResize() {
                    
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );

			}  //window resize settings end




            
            //animate function
            function animate() {
                if (!isPlay) return;
                requestAnimationFrame(animate);
                if ( plate !== undefined) {
                    plate.rotation.y += -.001; 
                };
                
                if ( plateTwo !== undefined ) {
                    plateTwo.rotation.y += -.001; 
                };
                
                
                render();
                controls.update();
                
    
                } //animate function end



            //render
			function render() {
                
				renderer.render( scene, camera ); 
                
			} //render end








    



            


