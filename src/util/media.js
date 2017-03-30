import { css } from 'styled-components'

const sizes = {
  giant: 1281,
  desktop: 1025,
  tablet: 961,
  portrait: 641,
  kindle: 481,
  phone: 320
}

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export default media;