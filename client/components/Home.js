import React from 'react'


class Home extends React.Component {

  constructor() {
    super()
    this.canvas = React.createRef();
  }

  state = {
    // vertex shader program
    vsSource: `
      attribute vec4 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `,
    // fragment shader program
    fsSource: `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `,
    gl: {}, // the webGl context ---> This will be an object that holds the dom node (canvas element, to be specific) + other shit
    programInfo: {}, // we'll hold our webGl program info here
    positionBuffer: {}, // we'll store the position buffer here ---> I need to find out what the data structure of this looks like
    shaderProgram: {}, // store our shader program
  }


  initCanvas = async () => {
    const canvas = this.canvas.current // get reference to the canvas
    const getgl = canvas.getContext('webgl'); // initialize webgl context
    await this.setState({gl: getgl}) // save this on state for later use
    // error handling in case webgl isn't supported
    if (this.state.gl === null) {
      alert('Unable to initialize webgl. Your browser or machine may not support it.')
      return
    }
    this.state.gl.clearColor(0.9, 0.9, 0.9, 1.0) // set clear colors
    this.state.gl.clear(this.state.gl.COLOR_BUFFER_BIT)
  }

  // initialize the shader program so that webgl knows how to render the data
  initShaderProgram = async (gl, vsSource, fsSource) => {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    // create the shader program:
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // Error handling: make an alert if shader program didn't work
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
      return null
    }
    await this.setState({ shaderProgram: shaderProgram })
    // return shaderProgram
  }

  // create shader of given type, upload source, & compile it
  loadShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    // send the source to the shader object
    gl.shaderSource(shader, source)
    // compile the shader program
    gl.compileShader(shader)
    // error handling: throw alert if this didn't compile successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
      return null
    }

    return shader
  }

  // we'll get our program info and then set it on state
  setGlProgramInfo = async (gl, shaderProgram) => {
    const getInfo = {
      program: shaderProgram,
      attribLocations: {
        VertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
      },
      uniformLocations: {
        ProjectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        ModelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
      }
    }
    await this.setState({ programInfo: getInfo })
  }

  initBuffers = async (gl) => {
    // create a buffer for the square's position
    const positionBuffer = gl.createBuffer()
    // select the position buffer as the one to apply buffer operations to
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    // create an array of positions for a square
    const positions = [
      -1.0, 1.0,
      1.0, 1.0,
      1.0, -1.0,
      -1.0, -1.0
    ]
    // pass the list of positions to webGl to build the shape
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    await this.setState({
      positionBuffer: {
        position: positionBuffer,
      }
    })
  }

  drawScene = (gl, programInfo, buffers) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const mat4 = new Mat4()
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-0.0, 0.0, -6.0]);  // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }


  async componentDidMount() {
    await this.initCanvas()
    await this.initShaderProgram(this.state.gl, this.state.vsSource, this.state.fsSource)
    await this.setGlProgramInfo(this.state.gl, this.state.shaderProgram)
    await this.initBuffers(this.state.gl)
    console.log('position buffer: ',this.state.positionBuffer);
    await this.drawScene(this.state.gl, this.state.programInfo, this.state.prositionBuffer)
  }

  render() {

    return (
      <canvas id="canvas" ref={this.canvas}/>
    )
  }
}

export default Home
