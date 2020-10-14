import { News } from 'src/entity/news';
import { getManager, getConnection } from "typeorm"

class NewsDAO {

    getAll() {
        return getManager().find(News);
    }

    getUserByID(idParam: string) {
        return News.findOne({
            where: {
                id: idParam
            }
        });
    }

    update(user: News) {
        return News.update(user.id, user);
    }

    save(user: News) {
        return News.save(user);
    }

    insert(users: News) {
        return getManager().save<News>(users);
    }

}

export default NewsDAO;
