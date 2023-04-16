var sqlMap = {
    user: {
        add: 'insert into user (username, email, password) values (?,?,?)',
        select: 'select * from user',
		update_failed_times: 'update user set failed_times = ? where username = ?',
		update_block_time: 'update user set block_time = ? where username = ?'
    },
	data: {
		load: 'select * from cancer_prediction_data',
		add: 'insert into cancer_prediction_data (mean_radius, mean_texture, mean_perimeter, mean_area, mean_smoothness, diagnosis) values (?,?,?,?,?,?)',
		delete: 'delete from cancer_prediction_data where id=?',
		edit: 'update cancer_prediction_data set mean_radius=?, mean_texture=?, mean_perimeter=?, mean_area=?, mean_smoothness=?, diagnosis=? where id=?',
		recover1: 'drop table cancer_prediction_data;',
		recover2: 'create table cancer_prediction_data (id int(11) not null unique auto_increment,mean_radius float not null,mean_texture float not null,mean_perimeter float not null,mean_area float not null,mean_smoothness float not null,diagnosis varchar(2) not null);',
		recover3: 'INSERT INTO cancer_prediction_data SELECT * FROM cancer_prediction_data_o;'
	}
}

module.exports = sqlMap;