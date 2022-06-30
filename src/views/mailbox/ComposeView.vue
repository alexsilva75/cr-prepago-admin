<template>
  <div class="col-md-9">
    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title">Nova Mensagem</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="form-group">
          <input class="form-control" placeholder="Destinatário:" />
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Assunto:" />
        </div>
        <div class="form-group">
          <textarea
            id="compose-textarea"
            class="form-control"
            style="height: 300px"
          ></textarea>
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <div class="float-right">
          <button type="submit" class="btn btn-primary">
            <i class="far fa-envelope"></i> Enviar
          </button>
        </div>
        <RouterLink to="/inbox/UNREAD" class="btn btn-default">
          <i class="fas fa-times"></i> Cancelar
        </RouterLink>
      </div>
      <!-- /.card-footer -->
    </div>
    <!-- /.card -->
  </div>
  <!-- /.col -->
</template>
