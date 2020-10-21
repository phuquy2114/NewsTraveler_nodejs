import {getManager} from "typeorm"
import {Thumbnail} from "../entity/Thumbnail"

class ThumbnailDao {

    getAll() {
        return getManager().find(Thumbnail);
    }

    insert(photo: Thumbnail) {
        return getManager().save<Thumbnail>(photo);
    }

}
export default ThumbnailDao;
