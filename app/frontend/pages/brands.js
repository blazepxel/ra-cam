import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Image from '~base/components/image'
import { injectIntl } from 'react-intl'

class Brands extends Component {
  async componentDidMount() {
    await this.loadData()
  }

  render() {
    const responsive = {
      0: {
        items: 99,
      },
      1024: {
        items: 99,
      },
    }

    return (
      <section className="section">
        <div className="">
          <div className="">
            <div className="columns">
              <div className="column">
                <AliceCarousel
                  dotsDisabled
                  buttonsDisabled
                  responsive={responsive}
                  autoPlay="true"
                  autoPlayInterval="4000"
                  infinite="true"
                >
                  <Image
                    src="/public/img/atlantida.png"
                    alt="atlantida"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/claro.png"
                    alt="claro"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/elpais.png"
                    alt="elpais"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/cocacola.png"
                    alt="cocacola"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/mitsu.png"
                    alt="mitsubishi"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/herba.png"
                    alt="herbalife"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/uni.png"
                    alt="unitec"
                    width="100"
                    height="100"
                  />
                  <Image
                    src="/public/img/tropi.png"
                    alt="tropical"
                    width="100"
                    height="100"
                  />
                </AliceCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default injectIntl(Brands)
