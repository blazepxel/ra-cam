import React from 'react'
import PageComponent from '~base/page-component'
import { FormattedMessage, injectIntl } from 'react-intl'
import api from '~base/api'
import { forcePublic } from '~base/middlewares/'
import { MegadraftEditor, editorStateFromRaw } from 'megadraft'

import { animateScroll as scroll, scroller } from 'react-scroll'
import { Helmet } from 'react-helmet'

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share'
import PluginImage from './plugins/image'
import PluginVideo from './plugins/video'
import PreviewBlog from './components/preview-blog'

class Blog extends PageComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.baseState,
      name: 'Eric',
      unreadCount: 1000,
      post: null,
      content: null,
    }
  }

  async componentDidMount() {
    scroll.scrollToTop()
    await this.loadData()
  }

  async loadData() {
    const { data } = await api.get(
      `/public/blog/${this.props.match.params.slug}`,
    )

    const content = editorStateFromRaw(JSON.parse(data.content))

    this.setState({
      post: data,
      content,
    })
  }

  render() {
    const basicStates = super.getBasicStates()
    if (basicStates) {
      return basicStates
    }

    const { post, content } = this.state

    if (!post) {
      return <div />
    }

    return (
      <div className="container">
        <Helmet>
          <meta property="og:site_name" content={`RA CAM: ${post.title}`} />
          <meta property="og:title" content={`RA CAM: ${post.title}`} />
        </Helmet>
        <div className="section">
          <div className="card is-shadowless">
            <div className="card-header is-shadowless">
              <h1 className="card-header-title title is-2">{post.title}</h1>
            </div>
            <hr className="divider" />
            {post.tags.length > 0 && (
              <div>
                Tags:
                {' '}
                {post.tags.map((l) => (
                  <span className=" margin-sides-icon tag is-info">{l}</span>
                ))}
              </div>
            )}
            <div className="card-content is-paddingless">
              {content && (
                <MegadraftEditor
                  plugins={[PluginImage, PluginVideo]}
                  readOnly
                  editorState={content}
                  onChange={(e) => this.onChange(e)}
                />
              )}
            </div>
          </div>
          <div className="is-flex-end">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <hr />
          <p className="is-font-size-24px">
            <FormattedMessage id="general.related_articles" />
          </p>
          <br />
          <PreviewBlog limit={3} />
        </div>
      </div>
    )
  }
}

Blog.config({
  path: '/blog/:slug',
  title: 'Blog',
  validate: forcePublic,
  exact: true,
})

export default injectIntl(Blog)
