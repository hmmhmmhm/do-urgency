/**
 * @author Stranger in the Q
 * @link https://codepen.io/strangerintheq/details/ZPWXGM
 */
export const filter = (props: {
  url: string
  fragCode: string
  canvasElement?: HTMLCanvasElement
}) => {
  const { fragCode, url, canvasElement } = props

  const canvas = canvasElement ?? document.createElement('canvas')
  const gl = (canvas.getContext('webgl', { preserveDrawingBuffer: true }) ||
    canvas.getContext('experimental-webgl', {
      preserveDrawingBuffer: true
    })) as WebGLRenderingContext

  let pid: WebGLProgram | null = null

  const loader = new Image()
  loader.crossOrigin = 'anonymous'
  loader.src = url
  loader.onload = function () {
    canvas.width = loader.width
    canvas.height = loader.height

    pid = gl.createProgram()

    const shader = (src: string, type: number) => {
      const sid = gl.createShader(type)!
      gl.shaderSource(sid, src)
      gl.compileShader(sid)
      const message = gl.getShaderInfoLog(sid)
      gl.attachShader(pid!, sid)
      if (message && message.length > 0) {
        console.log(
          src
            .split('\n')
            .map(function (str, i) {
              return ('' + (1 + i)).padStart(4, '0') + ': ' + str
            })
            .join('\n')
        )
        throw message
      }
    }

    shader(
      `
      attribute vec2 coords;
      void main(void) {
        gl_Position = vec4(coords.xy, 0.0, 1.0);
      }
      `,
      gl.VERTEX_SHADER
    )

    shader(
      `
      precision highp float;
      uniform sampler2D texture;

      vec4 sample(vec2 uv) {
          return texture2D(texture, uv);
      }

      ${fragCode}

      void main(void) {
          gl_FragColor = frag(vec2( 
            gl_FragCoord.x / ${canvas.width}.,  
            1. - gl_FragCoord.y / ${canvas.height}. 
          ));
      }
    `,
      gl.FRAGMENT_SHADER
    )

    gl.linkProgram(pid!)
    gl.useProgram(pid)

    const array = new Float32Array([-1, 3, -1, -1, 3, -1])
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW)

    const al = gl.getAttribLocation(pid!, 'coords')
    gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(al)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loader)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

    const textureLocation = gl.getUniformLocation(pid!, 'texture')
    gl.uniform1i(textureLocation, 0)

    filter.ready && filter.ready()
    filter.apply()
  }

  const filter = {
    canvas: canvas,
    ready: null as (() => void) | null,
    uniform: (
      type: string,
      name: string,
      v1?: string | number,
      v2?: string | number,
      v3?: string | number,
      v4?: string | number
    ) => {
      if (!pid) throw new Error('program not ready')
      var ul = gl.getUniformLocation(pid, name)
      gl['uniform' + type](ul, v1, v2, v3, v4)
      return filter
    },

    apply: () => {
      if (!pid) throw new Error('program not ready')
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.clearColor(0, 0, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      return filter
    }
  }

  return filter
}

export const getFragmentShaderCode = (options?: { samples?: number }) => {
  return `

  const int samples = ${options?.samples ?? 66};
  uniform float power;
  uniform vec2 mouse;
  
  mat2 rotate2d (float angle) {
    vec2 sc = vec2( sin(angle), cos(angle) );
    return mat2( sc.y, -sc.x, sc.xy );
  }
  
  vec4 frag (vec2 uv) {
  
    float rotateDir = sin(length(uv - mouse)*1./(0.005 + power*5.));
    rotateDir = smoothstep(-.3, .3, rotateDir)-.5;
  
    vec2 shiftDir = (uv-mouse)*vec2(-1.0,-1.0);
  
    vec4 color = vec4(0.);
    for (int i = 0; i < samples; i ++) {
      uv += float(i)/float(samples)*shiftDir*0.01;
      uv -= mouse;      
      uv *= rotate2d( rotateDir * power * float(i)); 
      uv += mouse;
      color += sample(uv)/float(samples+i);
    } 
    return color*1.5;
  }
  
  `
}
