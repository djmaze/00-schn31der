const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.floor(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
}

const defaultOptions = {
    formatTime,
    labelColor: undefined,
    labelSize: 11
}

class CursorTimePlugin extends WaveSurfer.BasePlugin {
  constructor(options) {
    super(options || {})
    this.options = Object.assign({}, defaultOptions, options)
  }

  static create(options) {
    return new CursorTimePlugin(options)
  }

  addUnits(value) {
    const units = typeof value === 'number' ? 'px' : ''
    return `${value}${units}`
  }

  onInit() {
    if (!this.wavesurfer) {
      throw Error('WaveSurfer is not initialized')
    }

    const $container = this.wavesurfer.getWrapper()
    const $cursor = $container.querySelector(".cursor")

    const $label = document.createElement("span")
    $label.attributes.part = "cursor-label"
    $cursor.appendChild($label)

    Object.assign($label.style, {
        position: "absolute",
        top: "2px",
        paddingLeft: "5px",
        color: this.addUnits(this.options.labelColor),
        fontSize: this.addUnits(this.options.labelSize)
    })

    this.wavesurfer.on('timeupdate', (currentTime) => ($label.textContent = this.options.formatTime(currentTime)))
  }

  destroy() {
    super.destroy()
  }
}