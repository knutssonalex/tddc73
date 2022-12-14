import styled from 'styled-components/native'
// @ts-expect-error
import bgImage from '../../assets/cards/2.jpeg'
// @ts-expect-error
import chipImage from '../../assets/cards/chip.png'
import { FocusedField, getVendorImage } from '.'

const CardBody = styled.View`
  width: 100%;
  aspect-ratio: 1.55;

  shadow-color: #000;
  shadow-offset: 0 40px;
  shadow-opacity: 0.01;
  shadow-radius: 40px;
  elevation: 1;
  z-index: 200;
`

const Column = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`

const Row = styled.View`
  flex-direction: row;
`

const Background = styled.ImageBackground`
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const Chip = styled.Image`
  margin: 26px;
  resize-mode: contain;
  aspect-ratio: 1.23;
  width: 90px;
`

const Vendor = styled.Image`
  margin: 20px;
  resize-mode: contain;
  width: 150px;
  height: 70px;
`

const DigitGroup = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin: 10px 20px;
`

const CardNumber = styled.View`
  flex-direction: row;
  border-width: 2px;
  border-color: ${(props: { focused: boolean }) => props.focused ? '#fff' : 'transparent'};
  border-radius: 8px;
`

const HolderContainer = styled.View`
  flex-direction: column;
  flex: 1;
  border-width: 2px;
  border-color: ${(props: { focused: boolean }) => props.focused ? '#fff' : 'transparent'};
  border-radius: 8px;
  padding: 10px;
`

const ExpireContainer = styled.View`
  flex-direction: column;
  border-width: 2px;
  border-color: ${(props: { focused: boolean }) => props.focused ? '#fff' : 'transparent'};
  border-radius: 8px;
  padding: 10px;
  margin-left: 10px;
`

const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #ccc;
  margin-bottom: 6px;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`

export interface Card {
  number: string
  name: string
  expiryMonth: string
  expiryYear: string
  cvc: string
}

export interface CardProps {
  card: Card
  focusedField: FocusedField
  onTop: boolean
}

const Front: React.FC<CardProps> = ({ card, focusedField, onTop }) => {
  const cardNumber = (card.number + '################').slice(0, 16)

  return (
    <CardBody style={{ zIndex: onTop ? 200 : 0 }}>
      <Background source={bgImage}>
        <Column>
          <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Chip source={chipImage} />
            <Vendor source={getVendorImage(card.number)} />
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            <CardNumber focused={focusedField === 'number'}>
              <DigitGroup>
                {cardNumber.slice(0, 4)}
              </DigitGroup>
              <DigitGroup>
                {cardNumber.slice(4, 8)}
              </DigitGroup>
              <DigitGroup>
                {cardNumber.slice(8, 12)}
              </DigitGroup>
              <DigitGroup>
                {cardNumber.slice(12, 16)}
              </DigitGroup>
            </CardNumber>
          </Row>

          <Row style={{ padding: 16 }}>
            <HolderContainer focused={focusedField === 'name'}>
              <Subtitle>Card Holder</Subtitle>
              <Title>{card.name}</Title>
            </HolderContainer>
            <ExpireContainer focused={focusedField === 'expiry'}>
              <Subtitle>Expires</Subtitle>
              <Title>{card.expiryMonth}/{card.expiryYear}</Title>
            </ExpireContainer>
          </Row>
        </Column>
      </Background>
    </CardBody>
  )
}

export default Front
