import Ratings from 'react-ratings-declarative'

export const BarComponent = ({ rate }) => {
  return (
    <Ratings
      rating={rate}
      widgetRatedColors="gold"
      widgetDimensions="18px"
      widgetSpacings="1px"
    >
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
      <Ratings.Widget />
    </Ratings>
  )
}

