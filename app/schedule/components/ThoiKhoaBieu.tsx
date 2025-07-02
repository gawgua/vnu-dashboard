'use client';

import { useState } from "react";
import { ThoiKhoaBieuTheoHocKy } from "../page";

export default function ThoiKhoaBieu({ data }: { data: ThoiKhoaBieuTheoHocKy[] }) {
	const [selectedId, setSelectedId] = useState<string>(data[0].id);
	
	const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedId(event.target.value);
	};

	const currentHocKy = data.find((hocKy) => hocKy.id === selectedId)!;

	return (
		<div>
			<label htmlFor="hocKySelect">Chọn học kỳ:</label>
			<select id="hocKySelect" value={selectedId} onChange={handleIdChange}>
				{data.map((hocKy) => (
					<option key={hocKy.id} value={hocKy.id}>
						{hocKy.tenHocKy}
					</option>
				))}
			</select>
			<div key={currentHocKy.id}>
				<h2>{currentHocKy.tenHocKy}</h2>
				<table>
					<thead>
						<tr>
							<th>Tên học phần</th>
							<th>Số tín chỉ</th>
							<th>Giảng viên</th>
							<th>Thời gian</th>
							<th>Địa điểm</th>
						</tr>
					</thead>
					<tbody>
						{currentHocKy.thoiKhoaBieu.map((monHoc) => (
							<tr key={monHoc.maHocPhan}>
								<td>{monHoc.tenHocPhan}</td>
								<td>{monHoc.soTinChi}</td>
								<td>{monHoc.giangVien1}</td>
								<td>{`${monHoc.ngayTrongTuan} ${monHoc.tietBatDau} - ${monHoc.tietKetThuc}`}</td>
								<td>{`${monHoc.diaChi}, ${monHoc.tenPhong}`}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}