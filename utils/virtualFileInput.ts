type FileCallbackType = (
  event:
    | {
        file: File
        thumbnail: string | ArrayBuffer | null
        getFormData: (name: string) => FormData
      }[]
    | void
) => unknown

type LimitCallbackType = (event: { size: number; sizeLimit: number }) => unknown

type NotSupportCallbackType = (event: {
  extension: string
  supportExtensions: string[]
}) => unknown

const getExtension = (filename: string) => {
  const parts = filename.split('.')
  return parts[parts.length - 1]
}

const isVideo = (filename: string) => {
  const ext = getExtension(filename)
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mp4':
    case 'mov':
    case 'mpg':
    case 'mpeg':
      return true
  }
  return false
}

export const createThumbnail: (
  file: File,
  canvasElement: HTMLCanvasElement
) => Promise<string | ArrayBuffer | null> = (file, canvasElement) => {
  return new Promise(async (resolve) => {
    try {
      if (isVideo(file.name)) {
        // Video Thumbnails
        if (canvasElement) {
          const video = document.createElement('video')
          const update = () => {
            canvasElement
              .getContext('2d')
              ?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          }

          video.addEventListener(
            'play',
            async () => {
              video.pause()

              const ratio = video.videoWidth / video.videoHeight
              const w = video.videoWidth - 100
              const h = parseInt(String(w / ratio), 10)
              canvasElement.width = w
              canvasElement.height = h

              update()
              resolve(canvasElement.toDataURL('image/png'))
            },
            false
          )
          video.src = URL.createObjectURL(file)
          video.autoplay = true
          canvasElement.appendChild(video)
        }
      } else {
        // Image Thumbnails
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target!.result)
        reader.readAsDataURL(file)
      }
    } catch (e) {
      resolve(null)
    }
  })
}

export const createFileInput = (
  inputParam:
    | {
        sizeLimit?: number
        /**
         * @example
         * supportExtensions: ['png', 'jpg', 'jpeg', 'gif']
         */
        supportExtensions?: string[]
        /**
         * accept=".jpg, .jpeg, .png"
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/file#limiting_accepted_file_types
         *
         * or MIME types
         * @see http://www.iana.org/assignments/media-types/media-types.xhtml
         */
        accept?: string
        multiple?: boolean
        capture?: string
      }
    | undefined
) => {
  const param = {
    sizeLimit: 0,
    supportExtensions: ['*'],
    multiple: false,
    ...(inputParam ?? {})
  }

  const preContainer = document.createElement('div')
  preContainer.style.display = 'none'

  const container = document.body.appendChild(preContainer)
  let canvasElement: HTMLCanvasElement | undefined = undefined

  try {
    canvasElement = container.appendChild(document.createElement('canvas'))
  } catch (e) {}

  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  if (param.accept !== undefined) fileInput.accept = param.accept
  if (param.multiple !== undefined) fileInput.multiple = param.multiple
  if (param.capture) (fileInput as any).capture = param.capture

  const changeCallbacks: FileCallbackType[] = []
  const limitCallbacks: LimitCallbackType[] = []
  const noSupportCallbacks: NotSupportCallbackType[] = []

  let isFileSelected = false
  fileInput.addEventListener('change', async (event: any) => {
    const { target } = event
    try {
      // * Newest Logic START
      if (target.value.length > 0) {
        const files = Array.from(target.files as FileList)
        const confirmedFiles: {
          file: File
          thumbnail: string | ArrayBuffer | null
          getFormData: (name: string) => FormData
        }[] = []

        for (const file of files) {
          // * Size limit check
          if (param.sizeLimit != 0 && file.size > param.sizeLimit) {
            for (const limitCallback of limitCallbacks)
              if (typeof limitCallback == 'function')
                await limitCallback({
                  size: file.size,
                  sizeLimit: param.sizeLimit
                })
            continue
          }

          // * Extension limit check
          const extension: string = getExtension(file.name).toLowerCase()
          const isExtensionAllAllowed =
            param.supportExtensions.indexOf('*') !== -1
          if (!isExtensionAllAllowed) {
            if (param.supportExtensions.indexOf(extension) === -1) {
              for (const noSupportCallback of noSupportCallbacks)
                if (typeof noSupportCallback == 'function')
                  noSupportCallback({
                    extension,
                    supportExtensions: param.supportExtensions
                  })
              continue
            }
          }

          // * Create Thumbnail
          const thumbnail = await createThumbnail(file, canvasElement!)

          const getFormData = (name: string) => {
            const form = new FormData()
            form.append(name, file)
            return form
          }

          confirmedFiles.push({ file, thumbnail, getFormData })
        }

        if (confirmedFiles.length > 0) {
          for (const changeCallback of changeCallbacks)
            if (typeof changeCallback == 'function')
              changeCallback(confirmedFiles)

          isFileSelected = true
        }
      } else {
        for (const changeCallback of changeCallbacks)
          if (typeof changeCallback == 'function') changeCallback()
        target.reset()
        isFileSelected = false
      }
      // * Before Logic ENDED
    } catch (e) {}
  })

  const element = container.appendChild(fileInput)
  const fileInputInstance = {
    element,
    open: () => {
      element.click()
      return fileInputInstance
    },
    onChange: (newCallback: FileCallbackType) => {
      changeCallbacks.push(newCallback)
      return fileInputInstance
    },
    onLimit: (newCallback: LimitCallbackType) => {
      limitCallbacks.push(newCallback)
      return fileInputInstance
    },
    onNoSupport: (newCallback: NotSupportCallbackType) => {
      noSupportCallbacks.push(newCallback)
      return fileInputInstance
    },
    isFileSelected: () => isFileSelected,
    getFile: () => {
      if (element.files?.length && element.files.length > 0) {
        return element.files[0]
      } else {
        return null
      }
    },
    getFiles: () => {
      if (element.files?.length && element.files.length > 0) {
        return Array.from(element.files)
      } else {
        return null
      }
    },
    getFormData: (name: string) => {
      const form = new FormData()
      if (element.files?.length && element.files.length > 0)
        form.append(name, element.files[0])
      return form
    },
    reset: () => {
      try {
        element.value = ''
      } catch (e) {}
      try {
        element.type = 'text'
        element.type = 'file'
      } catch (e) {}
      return fileInputInstance
    }
  }

  return fileInputInstance
}
