import '../root.scss'

function FooterComponent() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
          <div style={{width: '80%', marginTop: '5%', zIndex: '1'}} >
          <h2>What is this place?</h2>
          <ul>
            <li>Oh, it's just a blog. Free to use, you can create edit even delete posts. But Beware! Other users can delete your blogs too!</li>
          </ul>
          <br />
          <h2>What Tech Stack does this website use?</h2>
          <ul>
            <li>We use MERN Stack. M-E-R-N MongoDB, Express, ReactTS, NodeJS</li>
          </ul>
          <br />
          <h2>Who is the Author of this website?</h2>
          <ul>
            <li>Skayu#0001, you can contact me on discord whenever you want.</li>
          </ul>
          <br />
        </div>
        </div>
    )
}

export default FooterComponent;