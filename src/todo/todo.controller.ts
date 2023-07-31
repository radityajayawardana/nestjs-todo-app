import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todoDTO } from 'src/dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { };

  @Get('/semuaData')
  async semuaData(@Res() res) {
    const dataSiswa = await this.todoService.semuaData();
    return res.status(HttpStatus.OK).json(dataSiswa);
  }

  @Put('/edit')
  async editData(@Res() res, @Query('nama') nama, @Body() dataSiswa: todoDTO) {
    const edit = await this.todoService.editData(nama, dataSiswa);
    if (!edit) {
      throw new NotFoundException('Ada Kesalahan');
    }
    return res.status(HttpStatus.OK).json({
      pesan: "Berhasil Update Data",
      data: edit,
    });
  }

  @Get(':namaSiswa')
  async detailData(@Res() res, @Param('namaSiswa') namaSiswa) {
    const detail = await this.todoService.ambilData(namaSiswa);
    if (!detail) {
      throw new NotFoundException('Ada Kesalahan');
    }
    return res.status(HttpStatus.OK).json(detail);
  }

  @Post('/')
  async tambahData(@Res() res, @Body() dataSiswa: todoDTO) {
    const tambah = await this.todoService.tambahData(dataSiswa);
    return res.status(HttpStatus.OK).json({
      pesan: "Berhasil Tambah Data",
      data: tambah,
    });
  }

  @Delete('/hapus')
  async hapusData(@Res() res, @Query('nama') nama) {
    const hapus = await this.todoService.hapusData(nama);
    if (!hapus) {
      throw new NotFoundException('Ada Kesalahan')
    }
    return res.status(HttpStatus.OK).json({
      pesan: "Berhasil Hapus Data",
      deletedTodo: hapus,
    });
  }
}
