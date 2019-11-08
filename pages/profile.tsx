
import {
  UserAccountSettings
} from '@usermatic/client/components'


const Profile: React.FC<{}> = () => (
  <div className="container">
    <div className="row mt-5">
      <div className="col-9">
        <div className="display-4">
          Your Profile Page
        </div>
        <UserAccountSettings/>
      </div>
    </div>
  </div>
)

export default Profile
