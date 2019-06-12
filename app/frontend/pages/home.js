/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PageComponent from '~base/page-component'
import { FormattedMessage, injectIntl } from 'react-intl'
import { forcePublic } from '~base/middlewares/'
import Image from '~base/components/image'
import PreviewPortfolio from './portfolio/preview-portfolio'
import PreviewBlog from './blog/components/preview-blog'
import Pricing from './pricing'

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
      <section className="app">
        <div className="container section" align="center">
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
          <Image src="/public/img/planets.svg" id="phone" alt="ra cam" />
        </div>
        <div className="planets">
          <Image src="/public/img/planet1.svg" id="planet1" alt="ra cam" />
          <Image src="/public/img/astronaut.svg" id="astronaut" alt="ra cam" />
          <Image src="/public/img/planet2.svg" id="planet2" alt="ra cam" />
          <Image src="/public/img/planet3.svg" id="planet3" alt="ra cam" />
        </div>
        <div className="container section">
          <div className="columns">
            <div className="column">
              <p>
                <strong className="is-font-blue">
                  <FormattedMessage id="general.create" />
                </strong>
                {', '}
                <strong className="is-font-blue">
                  <FormattedMessage id="general.publish" />
                  {' '}
                </strong>
                <FormattedMessage id="general.and" />
                {' '}
                <strong className="is-font-blue">
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
            <div className="column video" align="center">
              <p className="is-hidden-touch">
                <strong className="is-font-blue">
                  <FormattedMessage id="general.see_how_works" />
                </strong>
              </p>
              <a href="#">
                <Image src="../../public/img/video.png" alt="ra cam" />
              </a>
            </div>
          </div>
          <Image
            src="/public/img/arrow.svg"
            className="is-hidden-touch"
            id="arrow"
            alt="ra cam"
          />
        </div>

        <PreviewPortfolio />
        <Pricing />
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
