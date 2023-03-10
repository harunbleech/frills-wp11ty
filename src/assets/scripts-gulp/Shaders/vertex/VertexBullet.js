const VERTEX_BULLET =  `
    precision mediump float;
    uniform float velocity;
    uniform float uProgress;
   
    varying vec2 vUv;

    #define M_PI 1.0

    void main() {
      vUv = uv;
      vec3 pos = position;
    //

    //RECTO
    //pos.z = pos.z + (((uv.y * M_PI) * uProgress*.2) * -0.125);
    //pos.z = pos.z - uProgress*.2;

    //CURVA
    //pos.y = pos.y + ((sin(uv.y * M_PI) * velocity) * 1.0);
    //pos.z = pos.z + ((sin(uv.y * M_PI) * velocity) * 0.125);
    pos.z = pos.z + ((uv.y * velocity) * 0.125);
    
    //pos.y = pos.y + ((sin(uv.x * M_PI) * velocity) * 0.125);
    //pos.z = pos.z + ((sin(uv.x * M_PI) * velocity) * 0.125);
    
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      
    }
    `;






/*





void main(){
    vec3 pos = position;
    //

    //RECTO
    //pos.z = pos.z + (((uv.y * M_PI) * uProgress*.2) * -0.125);

    //pos.z = pos.z - uProgress*.2;

    //CURVA
    pos.z = pos.z + ((sin(uv.y * M_PI) * -uvelocity) * 0.6);
    //pos.z = pos.z + ((sin(uv.y * M_PI) * uvelocity) * 0.125);


    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}*/