import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const glbLoader = new GLTFLoader();

// Function to load multiple GLTF models
// models: array to store loaded models
// glbPaths: array of filepaths of GLB files stored in 'glbs' folder
async function loadGLBModels(models, glbPaths) {
  const promises = glbPaths.map((path) =>
    new Promise((resolve, reject) => {
      glbLoader.load(
        `glbs/${path}`,
        (gltf) => {
          const model = gltf.scene;
          // Optional: Traverse the model to find and store meshes if needed
          // pass in an array to store meshes in this case
          /* model.traverse((child) => {
            if (child.isMesh) {
              meshes.push(child);
            }*/
          models.push(model);

          resolve();
        },
        undefined,
        (error) => reject(error)
      );
    })
  );

  try {
    await Promise.all(promises);
    console.log("All GLTF models loaded successfully.");

  } catch (error) {
    console.error("Error loading GLTF models:", error);
  }
}

export default loadGLBModels;