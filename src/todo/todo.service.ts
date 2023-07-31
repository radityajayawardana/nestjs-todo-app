import { Injectable } from '@nestjs/common';
import { todoDTO } from 'src/dto/todo.dto';

interface Todo {
  readonly nama: string;
  readonly nomor: number;
  readonly kelas: string;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  async semuaData(): Promise<Todo[]> {
    return this.todos;
  }

  async ambilData(namaSiswa: string): Promise<Todo> {
    const siswa = this.todos.find((todo) => todo.nama === namaSiswa);
    return siswa;
  }

  async tambahData(dataSiswa: todoDTO): Promise<Todo> {
    this.todos.push(dataSiswa);
    return this.todos.at(-1);
  }

  async hapusData(namaSiswa: string): Promise<any> {
    const indx = this.todos.findIndex((todo) => todo.nama === namaSiswa);
    return this.todos.splice(indx, 1);
  }
  async editData(namaSiswa: string, dataSiswa: todoDTO): Promise<Todo> {
    await this.hapusData(namaSiswa);
    this.todos.push(dataSiswa);
    return this.todos.at(-1);
  }
}
