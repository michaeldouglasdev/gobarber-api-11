import ICreateAppointmentDTO from "@modules/appointments/dto/ICreateAppointmentDTO";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import { isEqual } from "date-fns";
import { uuid } from "uuidv4";

class FakeAppointmentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )

    return findAppointment;
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;