import React from 'react'
import PageComponent from '~base/page-component'
import { FormattedMessage, injectIntl } from 'react-intl'
import { forcePublic } from '~base/middlewares/'
import Image from '~base/components/image'
import PreviewPortfolio from './portfolio/preview-portfolio'
import PreviewBlog from './blog/components/preview-blog'
import Brands from './brands'

class Home extends PageComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.baseState,
    }
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <section className="app section">
        <div className="container" align="center">
          <p className="title has-text-black">
            <FormattedMessage
              id="general.intro"
              values={{
                icon: <i className="fa fa-heart heart margin-sides-icon" />,
              }}
            />
          </p>
          <p className="title">
            <FormattedMessage
              id="general.subtitle"
              values={{
                span: (
                  <span className="is-font-blue">
                    {formatMessage({ id: 'general.augmented_reality' })}
                  </span>
                ),
              }}
            />
          </p>
          <button type="button" className="button is-primary">
            <FormattedMessage id="general.try_now" />
            <i className="fa fa-rocket margin-sides-icon" />
          </button>
        </div>
        <div className="phone">
          <Image src="/public/img/phone.png" id="phone" alt="ra cam" />
        </div>
        <div className="planets">
          <Image src="/public/img/planet1.png" id="planet1" alt="ra cam" />
          <Image src="/public/img/astronaut.png" id="astronaut" alt="ra cam" />
          <Image src="/public/img/planet2.png" id="planet2" alt="ra cam" />
          <Image src="/public/img/arrow.png" id="planet3" alt="ra cam" />
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <p>
                <strong>
                  <FormattedMessage id="general.create" />
                </strong>
                {', '}
                <strong>
                  <FormattedMessage id="general.publish" />{' '}
                </strong>
                <FormattedMessage id="general.and" />{' '}
                <strong>
                  <FormattedMessage id="general.measure" />
                </strong>
                <br />
                <FormattedMessage
                  id="general.awesome_campaigns"
                  values={{
                    augmented_reality: (
                      <span>
                        {formatMessage({ id: 'general.augmented_reality' })}
                      </span>
                    ),
                  }}
                />
                <br />
              </p>
            </div>
            <div className="column" align="center">
              <p>
                <strong>
                  <FormattedMessage id="general.see_how_works" />
                </strong>
              </p>
              <button type="button" className="button is-primary">
                <FormattedMessage id="general.play_video" />
                <i className="fa fa-play margin-sides-icon" />
              </button>
            </div>
          </div>
          <Image src="/public/img/arrow.png" id="arrow" alt="ra cam" />
        </div>
        <Brands />
        <PreviewPortfolio />
        <PreviewBlog />
      </section>
    )
  }
}

Home.config({
  path: '/',
  title: 'RA CAM',
  validate: forcePublic,
  exact: true,
})

export default injectIntl(Home)
